import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import * as fs from "fs";
import * as https from "https";

import { spawn } from 'child_process';
import { Result } from './entity/result';
import { Extensions } from '../../entity/extensions.enum';
import { RunCommand } from '../../entity/run-command.enum';
import { CodeExecution } from './entity/code-execution';
import { FileService } from './file.service';

const { EXEC_TIMEOUT } = process.env

@Injectable()
export class ExecutionService {

    logger: Logger = new Logger("Execution");

    constructor(private fileService: FileService){}

    async runPython(message: CodeExecution): Promise<Result> {
        
        message.code = 
`import os 
dir_path = os.path.dirname(os.path.realpath(__file__))
f = open(dir_path + "/../file/${message.fileKey}", "rb")
${message.code}
run(f.read().hex());
`

        const formatStderr = (stderr: string) => {
            let tmp = stderr.split('\n');
            //tmp.splice(1,1);
            return tmp.join('\n');
        }
        
        return this.runCode(message, formatStderr)
    }

    async runJavascript(message: CodeExecution): Promise<Result> {

        message.code = 
        `
        const fs = require('fs');
        let data = fs.readFileSync(__dirname + '/../file/${message.fileKey}');
        ${message.code}
        run(data).then((resultBuffer) => {
            fs.writeFileSync(__dirname + '/../file/${message.name}:result.${message.fileKey.split('.').pop()}', Buffer.from(resultBuffer), { flag: 'w'})
        });
        `

        const formatStderr = (stderr: string) => {
            let tmp = stderr.split('\n');
            //tmp.splice(0,1);
            return tmp.join('\n');
        }
        
        return this.runCode(message, formatStderr)
    }

    downloadFile(url, dest, cb) {
        return new Promise((res,rej) => {
            fs.closeSync(fs.openSync(dest, 'w'))
            let file = fs.createWriteStream(dest);
            https.get(url, (response) => {
                response.pipe(file);
                file.on('finish', function() {
                    file.close();
                    cb()
                });
            }).on('error', (err) => {
                fs.unlinkSync(dest);
                if (cb) cb(err.message);
            });
        })
      };
      
    async runCode(codeExecution: CodeExecution, formatStderr: (stderr: string) => string): Promise<Result> {

        this.logger.log(`Start running code for ${codeExecution.userId}`);
        

        let stdout: string[] = [];
        let stderr: string[] = [];
        let isTimeout: boolean = false

        const resultKey = `${codeExecution.name}:result.${codeExecution.fileKey.split('.').pop()}`
        const filePath = `./file/${codeExecution.fileKey}`
        const codeFilePath = `./code/${codeExecution.name}-script.${Extensions[codeExecution.language]}`
        
        
        fs.writeFileSync(codeFilePath, codeExecution.code)

        await new Promise((res,rej) => {
            this.downloadFile(codeExecution.fileUrl, filePath, (err) => {
                if(err) rej(new NotFoundException(err)) 
                res(null)
            })
        })

        const statsInput = fs.statSync(filePath)

        const startExecution = Date.now()
        
        setTimeout(() => {
           isTimeout = true
           node.kill();
        }, parseInt(EXEC_TIMEOUT))
        
        const node = spawn(RunCommand[codeExecution.language], [codeFilePath]);


        node.stdout.on('data', function (data) {
            stdout.push(data.toString());
        });
        
        node.stderr.on('data', function (data) {
            stderr.push(data.toString());
        });
    
        return new Promise((resolve, reject) => {
            node.on('exit', async (code) => {
                
                const closeExecution = Date.now()
                
                const statsOutput = fs.statSync(filePath)

                fs.unlinkSync(codeFilePath)

                if(isTimeout){
                    let result: Result = {
                        code: null,
                        stdout: null,
                        stderr: `Timeout of ${EXEC_TIMEOUT}ms exceeded`,
                        executionTime: closeExecution - startExecution,
                        resultKey: null,
                        inputFileSize: {value: 0, unit: ""},
                        outputFileSize: {value: 0, unit: ""}
                    }
                    resolve(result)
                }

                await this.fileService.uploadFile(resultKey, codeExecution.userId)
                
                this.logger.log(`uploaded result for ${codeExecution.userId}`);


                let result: Result = {
                    code,
                    stdout: stdout.join(""),
                    stderr: stderr.join(""),
                    executionTime: closeExecution - startExecution,
                    resultKey,
                    inputFileSize: this.getFileSize(statsInput),
                    outputFileSize: this.getFileSize(statsOutput)
                }

                //remove filename from error
                if(result.stderr){
                    result.stderr = formatStderr(result.stderr)
                }

                this.logger.log(`Finished running code for ${codeExecution.userId}`);

                resolve(result)
            })
        })

    }

    getFileSize(stats: fs.Stats): FileSize {
        let bitSizes = new Map<number, string>()
        bitSizes.set(0, "b")
        bitSizes.set(1, "Kb")
        bitSizes.set(2, "Mb")
        bitSizes.set(3, "Gb")
        bitSizes.set(4, "Tb")
        bitSizes.set(5, "Pb")

        let value = stats.size
        
        let counter = 0;
        while(value / 1000 > 1){

            counter++;
            value /= 1000
        }

        return {
            value,
            unit: bitSizes.get(counter)
        }
    }
}

export type FileSize = { unit: string, value: number}
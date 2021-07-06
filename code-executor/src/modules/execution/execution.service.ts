import { Injectable, NotFoundException } from '@nestjs/common';
import * as fs from "fs";
import * as https from "https";

import { spawn, exec } from 'child_process';
import { Result } from './entity/result';
import { Languages } from './entity/languages.enum';
import { Extensions } from '../../entity/extensions.enum';
import { RunCommand } from '../../entity/run-command.enum';
import { CodeExecution } from './entity/code-execution';
import { config } from 'src/main';
import { FileService } from './file.service';
@Injectable()
export class ExecutionService {

    constructor(private fileService: FileService){}

    executionTimeoutMs: number = config.execution_timeout;

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
            tmp.splice(1,1);
            return tmp.join('\n');
        }
        
        return this.runCode(message, formatStderr)
    }
    
    writeResults(buffer: Buffer){
        //fs.writeFileSync(__dirname + '/../file/${message.name}:result${message.fileKey.split('.').pop()}', Buffer.from(resultBuffer), { flag: 'wb'})
        
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
            tmp.splice(0,1);
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
        

        const startExecution = Date.now()
        
        setTimeout(() => {
           isTimeout = true
           node.kill();
        }, this.executionTimeoutMs)
        
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
                
                fs.unlinkSync(codeFilePath)

                if(isTimeout){
                    let result: Result = {
                        code: null,
                        stdout: null,
                        stderr: `Timeout of ${this.executionTimeoutMs}ms exceeded`,
                        executionTime: closeExecution - startExecution,
                        resultKey: null
                    }
                    resolve(result)
                }

                await this.fileService.uploadFile(resultKey, codeExecution.userId)
                
                let result: Result = {
                    code,
                    stdout: stdout.join(""),
                    stderr: stderr.join(""),
                    executionTime: closeExecution - startExecution,
                    resultKey
                }

                //remove filename from error
                if(result.stderr){
                    result.stderr = formatStderr(result.stderr)
                }

                resolve(result)
            })
        })

    }
}

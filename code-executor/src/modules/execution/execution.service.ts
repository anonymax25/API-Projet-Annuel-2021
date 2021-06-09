import { Injectable, NotFoundException } from '@nestjs/common';
import * as fs from "fs";
import * as https from "https";

import { spawn, exec } from 'child_process';
import { Result } from './entity/result';
import { Languages } from './entity/languages.enum';
import { Extensions } from '../../entity/extensions.enum';
import { RunCommand } from '../../entity/run-command.enum';
import { CodeExecution } from './entity/code-execution';
import { S3Service } from './s3.service';

@Injectable()
export class ExecutionService {

    constructor(public s3Service: S3Service){}

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
    
    async runJavascript(message: CodeExecution): Promise<Result> {

        message.code = 
        `
        const fs = require('fs');
        let data = fs.readFileSync(__dirname + '/../file/${message.fileKey}');
        ${message.code}
        run(data);
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

        let stdout = [];
        let stderr = [];

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
        const node = spawn(RunCommand[codeExecution.language], [codeFilePath]);

        node.stdout.on('data', function (data) {
            stdout.push(data.toString());
        });
        
        node.stderr.on('data', function (data) {
            stderr.push(data.toString());
        });
    
        return new Promise((resolve, reject) => {
            node.on('close', (code) => {
                const closeExecution = Date.now()
                fs.unlinkSync(codeFilePath)
                fs.unlinkSync(filePath)

                let result: Result = {
                    code,
                    stdout: stdout.join(""),
                    stderr: stderr.join(""),
                    executionTime: closeExecution - startExecution
                }

                //remove filename from error
                if(result.stderr){
                    result.stderr = formatStderr(result.stderr)
                }

                console.log(result);
                
                
                resolve(result)
    
            })
        })

    }
}

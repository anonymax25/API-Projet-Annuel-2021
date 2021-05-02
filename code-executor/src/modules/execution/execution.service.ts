import { Injectable } from '@nestjs/common';
import * as fs from "fs";
import { spawn } from 'child_process';
import { CodeExecution } from '../../entity/code-execution';
import { Result } from '../../entity/result';

@Injectable()
export class ExecutionService {

    async runPython(message: CodeExecution): Promise<Result> {
        
        const filename = `${message.name}-script.py`
    
        fs.writeFileSync(filename, message.code)
    
        let stdout;
        let stderr;

        const python = spawn('python', [filename]);

        python.stdout.on('data', function (data) {
            stdout = data.toString();
        });
        
        python.stderr.on('data', function (data) {
            stderr = data.toString();
        });
    
        return new Promise((resolve, reject) => {
            python.on('close', (code) => {
            
                
                fs.unlinkSync(filename)

                let result: Result = {
                    code,
                    stdout,
                    stderr,
                }
                resolve(result)
    
            })
        })
    }
    
    async runJavascript(message: CodeExecution): Promise<Result> {
        
        const filename = `${message.name}-script.js`
    
        fs.writeFileSync(filename, message.code)
    
        let stdout;
        let stderr;

        const node = spawn('node', [filename]);

        node.stdout.on('data', function (data) {
            stdout = data.toString();
        });
        
        node.stderr.on('data', function (data) {
            stderr = data.toString();
        });
    
        return new Promise((resolve, reject) => {
            node.on('close', (code) => {
            
                
                fs.unlinkSync(filename)

                let result: Result = {
                    code,
                    stdout,
                    stderr,
                }
                resolve(result)
    
            })
        })
    }
}

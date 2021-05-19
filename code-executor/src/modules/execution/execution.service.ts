import { Injectable } from '@nestjs/common';
import * as fs from "fs";
import { spawn } from 'child_process';
import { CodeExecution } from '../../entity/code-execution';
import { Result } from '../../entity/result';
import { Languages } from '../../entity/languages.enum';
import { Extensions } from '../../entity/extensions.enum';
import { RunCommand } from '../../entity/run-command.enum';

@Injectable()
export class ExecutionService {

    async runPython(message: CodeExecution): Promise<Result> {
        

        const formatStderr = (stderr: string) => {
            let tmp = stderr.split('\n');
            tmp.splice(1,1);
            return tmp.join('\n');
        }
        
        return this.runCode(message, formatStderr)
    }
    
    async runJavascript(message: CodeExecution): Promise<Result> {
        
        const formatStderr = (stderr: string) => {
            let tmp = stderr.split('\n');
            tmp.splice(0,1);
            return tmp.join('\n');
        }
        
        return this.runCode(message, formatStderr)
    }


    runCode(codeExecution: CodeExecution, formatStderr: (stderr: string) => string): Promise<Result> {
        
        const filename = `${codeExecution.name}-script.${Extensions[codeExecution.language]}`
    
        fs.writeFileSync(filename, codeExecution.code)
    
        let stdout;
        let stderr;

        const startExecution = Date.now()
        const node = spawn(RunCommand[codeExecution.language], [filename]);

        node.stdout.on('data', function (data) {
            stdout = data.toString();
        });
        
        node.stderr.on('data', function (data) {
            stderr = data.toString();
        });
    
        return new Promise((resolve, reject) => {
            node.on('close', (code) => {
                const closeExecution = Date.now()
                fs.unlinkSync(filename)

                let result: Result = {
                    code,
                    stdout,
                    stderr,
                    executionTime: closeExecution - startExecution
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

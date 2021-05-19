import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { CodeResult } from '../../entity/code-result';
import { Languages } from '../../entity/languages.enum';
import { Result } from '../../entity/result';
import { ExecuteCodeDTO } from './dto/execute-code.dto';
import { ExecutionService } from './execution.service';

@Controller('execution')
export class ExecutionController {

    constructor(private executionService: ExecutionService){}

    @Post()
    async launch(@Body() body: ExecuteCodeDTO){

        let result: Result = null
        switch(body.codeExecution.language) {
            case Languages.python:
                result = await this.executionService.runPython(body.codeExecution)
                break
            case Languages.javascript:
                result = await this.executionService.runJavascript(body.codeExecution)
                break
            default:
                throw new BadRequestException(null, 'Unsupported language')
        }
        
        return new CodeResult(body.codeExecution.language, result)
    }
}

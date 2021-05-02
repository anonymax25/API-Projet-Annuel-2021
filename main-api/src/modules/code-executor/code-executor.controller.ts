import { BadRequestException, Body, Controller, Inject, Param, Post, Req, UseGuards } from '@nestjs/common';
import RequestWithUser from '../authentication/interface/requestWithUser.interface';
import JwtAuthenticationGuard from '../authentication/passport/jwt-authentication.guard';
import { CodeExecutorService } from './code-executor.service';
import { ExecuteDTO } from './dto/execute.dto';
import { CodeResult } from './entity/code-result';
import { Languages } from './entity/languages.enum';

@Controller('execute')
export class CodeExecutorController {

    constructor(private codeExecutorService: CodeExecutorService){
    }
  
    @UseGuards(JwtAuthenticationGuard)
    @Post()
    async execute_python(@Req() req: RequestWithUser, @Body() body: ExecuteDTO){
        
        let result: CodeResult = null
        switch(body.language) {
            case Languages.Python:
                result = await this.codeExecutorService.sendPython(body.code, req.user.name)
                break
            default:
                throw new BadRequestException(null, 'Unsupported language')
        }
        
        return result
    }
}

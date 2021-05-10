import { BadRequestException, Body, Controller, Inject, Param, Post, Req, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import RequestWithUser from '../authentication/interface/requestWithUser.interface';
import JwtAuthenticationGuard from '../authentication/passport/jwt-authentication.guard';
import { CodeExecutorService } from './code-executor.service';
import { ExecuteDTO } from './dto/execute.dto';
import { CodeResult } from './entity/code-result';
import { Languages } from './entity/languages.enum';

@ApiTags('executor')
@Controller('execute')
export class CodeExecutorController {

    constructor(private codeExecutorService: CodeExecutorService){
    }
  
    @UseGuards(JwtAuthenticationGuard)
    @Post()
    async execute_python(@Req() req: RequestWithUser, @Body() body: ExecuteDTO){
        return await this.codeExecutorService.sendCode(body.code, req.user.name, body.language)
    }
}

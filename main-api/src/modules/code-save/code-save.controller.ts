import { Controller, Get, Query, Req, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Languages } from '../code-executor/entity/languages.enum';
import RequestWithUser from '../authentication/interface/requestWithUser.interface';
import JwtAuthenticationGuard from '../authentication/passport/jwt-authentication.guard';
import { CodeSaveService } from './code-save.service';

@ApiTags('code-save')
@Controller('code-save')
export class CodeSaveController {
  constructor(
    private readonly codeSaveService: CodeSaveService,
  ) { }

  
  @Get('code')
  async getCodesByName(@Req() request: RequestWithUser, @Query('name') name: string) {
    if(isNaN(+name))
      return this.codeSaveService.findByName(name);
    else  
      return this.codeSaveService.findById(parseInt(name));
    
  }
  
  @Get('codes')
  async getAllCodes(@Req() request: RequestWithUser, @Query('language') language: Languages) {
    return this.codeSaveService.findAll();
  }

}

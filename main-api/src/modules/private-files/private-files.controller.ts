import { Controller, Get, Param, Req, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import RequestWithUser from '../authentication/interface/requestWithUser.interface';
import JwtAuthenticationGuard from '../authentication/passport/jwt-authentication.guard';
import { PrivateFilesService } from './private-files.service';

@ApiTags('private-files')
@Controller('private-files')
export class PrivateFilesController {

    constructor(private privateFilesService: PrivateFilesService){}
  
    @UseGuards(JwtAuthenticationGuard)
    @Get('url/:key')
    async execute_python(@Req() req: RequestWithUser, @Param('key') key: string){
        return new URL(await this.privateFilesService.generatePresignedUrl(key), key)
    }
}

export class URL {
    constructor(public url: string, public key: string){}
}

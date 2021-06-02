import { BadRequestException, Body, Controller, Inject, Param, Post, Get, Req, Res, UseGuards } from '@nestjs/common';
import JwtAuthenticationGuard from '../../../../main-api/src/modules/authentication/passport/jwt-authentication.guard';
import { ApiTags } from '@nestjs/swagger';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { UseInterceptors } from '@nestjs/common';
import { UploadedFile } from '@nestjs/common';
import RequestWithUser from 'modules/authentication/interface/requestWithUser.interface';
import { FileUploadService } from './file-upload.service';
import { FileUploadDTO } from './dto/FileUploadDTO';



@ApiTags('fileUpload')
@Controller('file')
export class FileUploadController {

    constructor(private fileUploadService: FileUploadService){
    }

    @UseGuards(JwtAuthenticationGuard)
    @Post()
    @UseInterceptors(FileInterceptor('file'))
    async uploadFile(@Req() req: RequestWithUser, @UploadedFile() file) {
        file.filename = req.user.name + file.originalname;
        return await this.fileUploadService.uploadFile(file);
    }

    @UseGuards(JwtAuthenticationGuard)
    @Get(':filepath')
    async seeUploadedFile(@Param('filepath') filename, @Res() res) {
        return await this.fileUploadService.seeUploadFile(filename);
    }
}
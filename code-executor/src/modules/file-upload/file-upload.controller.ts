import { Body, Controller, Param, Post, Get, Res } from '@nestjs/common';

import { FileUploadDTO } from './dto/FileUploadDTO';
import { FileUploadService } from './file-upload.service';
import { FileUpload } from './entity/file-upload';


@Controller('file')
export class FileUploadController {

    constructor(private fileUploadService: FileUploadService){}

    @Post()
    async upload(@Body() file: FileUploadDTO) {

        let data: FileUpload = new FileUpload(
            file.originalname,
            file.buffer.data,
            file.filename)

        return await this.fileUploadService.upload(data);
    }

    
    @Get(':filepath')
    seeUploadedFile(@Param('filepath') filename, @Res() res) {
        return res.sendFile(filename, { root: './files' });
    }
}
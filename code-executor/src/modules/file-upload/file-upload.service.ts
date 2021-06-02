import { Injectable } from '@nestjs/common';
import * as fs from "fs";
import { spawn } from 'child_process';
import { FileUpload } from './entity/file-upload';
import { FileUploadResult } from './entity/file-upload-result';
import { Result } from './entity/result';

@Injectable()
export class FileUploadService {

    async upload(file: FileUpload): Promise<FileUploadResult> {

        let originalname: string = file.originalname;
        let filename: string = file.filename;

        await fs.writeFile("/usr/src/app/files/" + file.filename, Buffer.from(file.buffer), function(err) {
            if(err) return console.error(err);
          });

        let result: Result = {
            originalname,
            filename,
        }

        return new FileUploadResult(result);
    }
}

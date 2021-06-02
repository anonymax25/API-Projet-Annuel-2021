import { HttpService, NotFoundException } from "@nestjs/common";
import { Injectable } from "@nestjs/common";
import axios from "axios";
import { AxiosInstance } from "axios";
import { FileUploadResult } from "./entity/file-upload-result";


const { CODE_EXECUTOR_URL, CODE_EXECUTOR_PORT } = process.env

@Injectable()
export class FileUploadService {

    private fileUploadClient: AxiosInstance;

    constructor(private httpService: HttpService){
        this.fileUploadClient = axios.create();
    }
    
    async uploadFile(file ): Promise<FileUploadResult>{

        console.log(`${CODE_EXECUTOR_URL}:${CODE_EXECUTOR_PORT}/file`)

        const url = `${CODE_EXECUTOR_URL}:${CODE_EXECUTOR_PORT}/file`

        try {
            const response = await this.httpService.post(url, file).toPromise();
            return new FileUploadResult(response.data)
        }catch(e){
            throw new NotFoundException('Coudln\'t connect to code executor')
        }
        
    }

    async seeUploadFile(filename: string) {

        return "to implement";
        
    }
}
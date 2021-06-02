import { IsNotEmpty, IsOptional } from "class-validator";
import { BufferDTO } from "./BufferDTO";

export class FileUploadDTO {
    
    @IsNotEmpty()
    fieldname: number
    
    @IsNotEmpty()
    originalname: string

    @IsNotEmpty()
    encoding: string

    @IsNotEmpty()
    mimetype: string

    @IsNotEmpty()
    buffer: BufferDTO

    @IsNotEmpty()
    size: number

    @IsOptional()
    filename: string
}
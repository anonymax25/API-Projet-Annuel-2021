import { IsNotEmpty, IsOptional } from "class-validator";

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
    buffer: Buffer

    @IsNotEmpty()
    size: number

    @IsOptional()
    filename: string
}
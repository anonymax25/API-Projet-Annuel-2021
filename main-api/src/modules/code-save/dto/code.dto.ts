import { IsNotEmpty, IsOptional, IsString, MinLength } from "class-validator";

export class CodeDTO {
    
    @IsString()
    @IsNotEmpty()
    @MinLength(1)
    name: string
    
    @IsString()
    @IsNotEmpty()
    code: string

    @IsOptional()
    id: number
}
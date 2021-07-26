import { IsIn, IsNotEmpty, IsOptional, IsString, MinLength } from "class-validator";
import { Languages } from "../../code-executor/entity/languages.enum";

export class CodeDTO {
    
    @IsString()
    @IsNotEmpty()
    @MinLength(1)
    name: string
    
    @IsString()
    @IsNotEmpty()
    code: string

    @IsNotEmpty()
    @IsIn(Object.values(Languages))
    language: Languages

    @IsOptional()
    id: number
}
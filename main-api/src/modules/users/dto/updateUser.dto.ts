import { IsEmail, IsNotEmpty, IsOptional, IsString, MinLength } from "class-validator";

export class UpdateUserDTO {
    
    @IsNotEmpty()
    id: number
    
    @IsString()
    @IsOptional()
    @MinLength(1)
    name: string
    
    @IsOptional()
    @IsEmail()
    email: string
}
import { IsIn, IsNotEmpty, IsOptional } from "class-validator"
import { Languages } from "../entity/languages.enum"

export class ExecuteDTO {

    @IsNotEmpty()
    code: string

    @IsNotEmpty()
    @IsIn(Object.values(Languages))
    language: Languages

    @IsOptional()
    key: string
}
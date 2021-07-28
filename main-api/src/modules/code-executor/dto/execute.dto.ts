import { IsIn, IsNotEmpty, IsOptional } from "class-validator"
import Code from "../../code-save/code-save.entity"
import { Languages } from "../entity/languages.enum"

export class ExecuteDTO {

    @IsNotEmpty()
    code: Code

    @IsNotEmpty()
    @IsIn(Object.values(Languages))
    language: Languages

    @IsOptional()
    key: string
}
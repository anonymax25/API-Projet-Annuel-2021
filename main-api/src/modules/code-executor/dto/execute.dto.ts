import { IsIn, IsNotEmpty } from "class-validator"
import { Languages } from "../entity/languages.enum"

export class ExecuteDTO {

    @IsNotEmpty()
    code: string

    @IsNotEmpty()
    @IsIn(Object.values(Languages))
    language: Languages
}
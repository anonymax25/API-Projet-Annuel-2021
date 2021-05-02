import { IsNotEmpty, IsNotEmptyObject } from "class-validator";
import { CodeExecution } from "../../../entity/code-execution";

export class ExecutePythonDTO {
    @IsNotEmptyObject()
    codeExecution: CodeExecution
}
import { IsNotEmptyObject } from "class-validator";
import { CodeExecution } from "../../../entity/code-execution";

export class ExecuteCodeDTO {
    @IsNotEmptyObject()
    codeExecution: CodeExecution
}
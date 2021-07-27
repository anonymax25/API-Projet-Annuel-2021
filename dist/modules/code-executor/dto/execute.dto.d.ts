import Code from "modules/code-save/code-save.entity";
import { Languages } from "../entity/languages.enum";
export declare class ExecuteDTO {
    code: Code;
    language: Languages;
    key: string;
}

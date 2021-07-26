import { Languages } from "./languages.enum";
import { Result } from "./result";
export declare class CodeResult {
    language: Languages;
    result: Result;
    constructor(language: Languages, result: Result);
}

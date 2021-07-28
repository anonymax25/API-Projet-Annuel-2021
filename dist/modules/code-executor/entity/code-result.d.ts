import { TokenCode } from "modules/code-token/code-token.entity";
import { Languages } from "./languages.enum";
import { Result } from "./result";
export declare class CodeResult {
    language: Languages;
    result: Result;
    similarity: CodeSimilarity;
    constructor(language: Languages, result: Result, similarity: CodeSimilarity);
}
export declare class CodeSimilarity {
    token: TokenCode;
    percent: number;
}

import { TokenCode } from "../../code-token/code-token.entity";
import { Languages } from "./languages.enum";
import { Result } from "./result";

export class CodeResult {
    constructor(public language: Languages, public result: Result, public similarity: CodeSimilarity){}
}

export class CodeSimilarity {
    token: TokenCode
    percent: number
}
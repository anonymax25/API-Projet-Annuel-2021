import { Languages } from "./languages.enum";
import { Result } from "./result";

export class CodeResult {
    constructor(public language: Languages, public result: Result, public similarity: number){}
}
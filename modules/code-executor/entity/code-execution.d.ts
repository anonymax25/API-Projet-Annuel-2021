import { Languages } from "./languages.enum";
export declare class CodeExecution {
    name: string;
    code: string;
    language: Languages;
    fileUrl: string;
    fileKey: string;
    userId: number;
    constructor(name: string, code: string, language: Languages, fileUrl: string, fileKey: string, userId: number);
}

import { Languages } from "./languages.enum";

export class CodeExecution {
    constructor(
        public name: string, 
        public code: string, 
        public language: Languages, 
        public fileUrl: string,
        public fileKey: string,
        public userId: number){}

}
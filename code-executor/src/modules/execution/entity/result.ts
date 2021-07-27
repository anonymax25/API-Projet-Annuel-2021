import { FileSize } from "../execution.service"

export class Result {
    code: number
    stdout: string
    stderr: string
    executionTime: number
    resultKey: string
    inputFileSize: FileSize
    outputFileSize: FileSize
}
export class Result {
    code: number
    stdout: string
    stderr: string
    executionTime: number
    resultKey: string
    inputFileSize: FileSize
    outputFileSize: FileSize
}

export class FileSize { 
    unit: string
    value: number
}
import { HttpService, Inject, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { response } from 'express';
import { CodeExecution } from './entity/code-execution';
import { CodeResult } from './entity/code-result';
import { Languages } from './entity/languages.enum';

const { CODE_EXECUTOR_URL, CODE_EXECUTOR_PORT } = process.env

@Injectable()
export class CodeExecutorService {

    private codeExecutorClient: AxiosInstance;

    constructor(private httpService: HttpService){
        this.codeExecutorClient = axios.create();
    }

    async sendPython(code: string, username: string): Promise<CodeResult>{

        const url = `${CODE_EXECUTOR_URL}:${CODE_EXECUTOR_PORT}/python`
        const body = {
            codeExecution: new CodeExecution(username, code, Languages.Python)
        }

        try {
            const response = await this.httpService.post(url, body).toPromise();
            return new CodeResult(Languages.Python, response.data)
        }catch(e){
            throw new NotFoundException('Coudln\'t connect to python code executor')
            
        }
        
    }
}

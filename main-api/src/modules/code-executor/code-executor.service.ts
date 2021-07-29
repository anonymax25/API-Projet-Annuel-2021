import { HttpService, Inject, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { response } from 'express';
import Code from '../code-save/code-save.entity';
import { TokenCodeSaveService } from '../code-token/code-token.service';
import { PrivateFilesService } from '../private-files/private-files.service';
import { CodeExecution } from './entity/code-execution';
import { CodeResult } from './entity/code-result';
import { Languages } from './entity/languages.enum';

const { CODE_EXECUTOR_URL, CODE_EXECUTOR_PORT } = process.env

@Injectable()
export class CodeExecutorService {

    private codeExecutorClient: AxiosInstance;
    private logger: Logger = new Logger('CodeExecutorService')

    constructor(private httpService: HttpService,
                private privateFilesService: PrivateFilesService,
                private readonly tokenCodeSaveService: TokenCodeSaveService,
                ){
        this.codeExecutorClient = axios.create();
        
    }
    
    async sendCode(code: Code, username: string,  language: Languages, key: string, userId: number): Promise<CodeResult> {

        let fileUrl = await this.privateFilesService.generatePresignedUrl(key)

        const url = `${CODE_EXECUTOR_URL}:${CODE_EXECUTOR_PORT}/execution`
        const body = {
            codeExecution: new CodeExecution(username, code.code, language, fileUrl, key, userId)
        }
        let codeSimilarity = await this.tokenCodeSaveService.getLowestSimilarityDistance(code, language);

        this.logger.log(`similarity: ${code.id ? code.id : "unsaved"} -> ${codeSimilarity.token ? codeSimilarity.token.codeId : "none found" } = ${codeSimilarity.percent}%`)

        try {
            this.logger.log(`Sending code execution`)
            const response = await this.httpService.post(url, body).toPromise();
            this.logger.log(`Finished code execution`)
            return new CodeResult(language, response.data, codeSimilarity)
        }catch(e){
            throw new NotFoundException(e.message)
        }
        
    }
}

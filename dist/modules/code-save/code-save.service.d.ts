import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { TokenCodeSaveService } from '../code-token/code-token.service';
import Code from './code-save.entity';
import { CodeDTO } from './dto/code.dto';
export declare class CodeSaveService {
    private codeSaveRepository;
    private readonly tokenCodeSaveService;
    private readonly configService;
    constructor(codeSaveRepository: Repository<Code>, tokenCodeSaveService: TokenCodeSaveService, configService: ConfigService);
    saveCode(ownerId: number, code: CodeDTO): Promise<Code>;
    findAll(): Promise<Code[]>;
    findByName(name: string): Promise<Code[]>;
    updateCode(code: CodeDTO | Code): Promise<Code | (CodeDTO & Code)>;
    deleteCode(id: number): Promise<import("typeorm").DeleteResult>;
}

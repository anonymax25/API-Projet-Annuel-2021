import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { S3 } from 'aws-sdk';
import { ConfigService } from '@nestjs/config';
import { TokenCodeSaveService } from '../code-token/code-token.service';
import Code from './code-save.entity';
import { CodeDTO } from './dto/code.dto';
import { Languages } from '../code-executor/entity/languages.enum';

 
@Injectable()
export class CodeSaveService {
  constructor(
    @InjectRepository(Code)
    private codeSaveRepository: Repository<Code>,
    private readonly tokenCodeSaveService: TokenCodeSaveService,
    private readonly configService: ConfigService
  ) {}
 
  async saveCode(ownerId: number, name: string, code: string, language: Languages) {
    const newCode = this.codeSaveRepository.create({
      name: name,
      code: code,
      owner: {
        id: ownerId
      },
      language
    });

    const codeDB: Code = await this.codeSaveRepository.save(newCode);
    await this.tokenCodeSaveService.saveToken(ownerId, codeDB, language);
    return codeDB;
  }
  
  async updateCode(code: CodeDTO | Code) {
    return await this.codeSaveRepository.save(code)
  }

  async deleteCode(id: number) {
    return await this.codeSaveRepository.delete({id});
  }
}
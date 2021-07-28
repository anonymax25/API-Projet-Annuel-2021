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
 
  async saveCode(ownerId: number, code: CodeDTO) {
    const newCode = this.codeSaveRepository.create({
      name: code.name,
      code: code.code,
      owner: {
        id: ownerId
      },
      language: code.language,
      isPrivate: code.isPrivate
    });

    const codeDB: Code = await this.codeSaveRepository.save(newCode);
    await this.tokenCodeSaveService.saveToken(ownerId, codeDB, code.language);
    return codeDB;
  }

  async findAll(){
    return this.codeSaveRepository.find({isPrivate: false});
  }

  async findByName(name: string){
    return this.codeSaveRepository.find({name});
  }
  
  async updateCode(code: CodeDTO | Code) {
    return await this.codeSaveRepository.save(code)
  }

  async deleteCode(id: number) {
    return await this.codeSaveRepository.delete({id});
  }
}
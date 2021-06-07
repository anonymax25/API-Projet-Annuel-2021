import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { S3 } from 'aws-sdk';
import { ConfigService } from '@nestjs/config';
import Code from './code-save.entity';

 
@Injectable()
export class CodeSaveService {
  constructor(
    @InjectRepository(Code)
    private codeSaveRepository: Repository<Code>,
    private readonly configService: ConfigService
  ) {}
 
  async saveCode(ownerId: number, name: string, code: string) {
    const s3 = new S3();
 
    const newCode = this.codeSaveRepository.create({
      name: name,
      code: code,
      owner: {
        id: ownerId
      }
    });
    await this.codeSaveRepository.save(newCode);
    return newCode;
  }
}
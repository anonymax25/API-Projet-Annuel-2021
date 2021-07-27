/// <reference types="node" />
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import PrivateFile from './private-file.entity';
export declare class PrivateFilesService {
    private privateFilesRepository;
    private readonly configService;
    constructor(privateFilesRepository: Repository<PrivateFile>, configService: ConfigService);
    uploadPrivateFile(dataBuffer: Buffer, ownerId: number, filename: string, isResult: boolean): Promise<PrivateFile>;
    generatePresignedUrl(key: string): Promise<string>;
    deleteFile(id: number): Promise<void>;
}

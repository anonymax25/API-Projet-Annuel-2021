/// <reference types="node" />
import { Languages } from '../code-executor/entity/languages.enum';
import Code from '../code-save/code-save.entity';
import { CodeSaveService } from '../code-save/code-save.service';
import { CodeDTO } from '../code-save/dto/code.dto';
import { PrivateFilesService } from '..//private-files/private-files.service';
import { Repository } from 'typeorm';
import { BaseService } from '../../shared/base.service';
import { UpdateUserDTO } from './dto/updateUser.dto';
import { User } from './user.entity';
export declare class UsersService extends BaseService<User> {
    private usersRepository;
    private readonly privateFilesService;
    private readonly codeSaveService;
    constructor(usersRepository: Repository<User>, privateFilesService: PrivateFilesService, codeSaveService: CodeSaveService);
    fillUser(user: User, updateUser: UpdateUserDTO): User;
    addPrivateFile(userId: number, imageBuffer: Buffer, filename: string, isResult?: boolean): Promise<import("../private-files/private-file.entity").default>;
    getAllPrivateFiles(userId: number): Promise<{
        id: number;
        name: string;
        key: string;
        url: string;
    }[]>;
    getAllCodesByLanguage(userId: number, language: string): Promise<{
        id: number;
        name: string;
        code: string;
        language: Languages;
        isPrivate: boolean;
        owner: User;
    }[]>;
    addCode(userId: number, code: CodeDTO): Promise<Code>;
    updateCode(code: CodeDTO | Code): Promise<Code | (CodeDTO & Code)>;
    deleteCode(id: number): Promise<import("typeorm").DeleteResult>;
}

/// <reference types="multer" />
import { UsersService } from './users.service';
import RequestWithUser from '../authentication/interface/requestWithUser.interface';
import { UpdateUserDTO } from './dto/updateUser.dto';
import { CodeDTO } from '../code-save/dto/code.dto';
import { PrivateFilesService } from '../private-files/private-files.service';
import Code from '../code-save/code-save.entity';
import { ResultFileDTO } from './dto/resultFile.dto';
export declare class UsersController {
    private readonly usersService;
    private readonly privateFilesService;
    constructor(usersService: UsersService, privateFilesService: PrivateFilesService);
    getProfile(request: RequestWithUser): Promise<import("./user.entity").User>;
    getAllPrivateFiles(request: RequestWithUser): Promise<{
        id: number;
        name: string;
        key: string;
        url: string;
    }[]>;
    deletePrivateFiles(request: RequestWithUser, id: number): Promise<void>;
    getAllCodes(request: RequestWithUser, language: string): Promise<{
        id: number;
        name: string;
        code: string;
        language: import("../code-executor/entity/languages.enum").Languages;
        isPrivate: boolean;
        owner: import("./user.entity").User;
    }[]>;
    getUserById(request: RequestWithUser, uid: number): Promise<import("./user.entity").User>;
    update(req: RequestWithUser, updateUser: UpdateUserDTO): Promise<import("./user.entity").User>;
    addPrivateFile(request: RequestWithUser, file: Express.Multer.File): Promise<import("../private-files/private-file.entity").default>;
    addPrivateFileById(request: RequestWithUser, id: number, isResult: boolean, file: Express.Multer.File): Promise<import("../private-files/private-file.entity").default>;
    addCode(request: RequestWithUser, code: CodeDTO): Promise<Code>;
    updateCode(request: RequestWithUser, code: CodeDTO | Code): Promise<Code | (CodeDTO & Code)>;
    deleteCode(request: RequestWithUser, id: number): Promise<import("typeorm").DeleteResult>;
    updateResultFile(request: RequestWithUser, id: number, body: ResultFileDTO): Promise<import("./user.entity").User>;
}

import { ConfigService } from "@nestjs/config";
import { BaseService } from "../../shared/base.service";
import { Repository } from "typeorm";
import { TokenCode } from "./code-token.entity";
export declare class TokenCodeSaveService extends BaseService<TokenCode> {
    private tokenCodeSaveRepository;
    private readonly configService;
    constructor(tokenCodeSaveRepository: Repository<TokenCode>, configService: ConfigService);
    saveToken(ownerId: number, code: string, langage: string): Promise<TokenCode>;
    deleteCode(id: number): Promise<import("typeorm").DeleteResult>;
    getLowestSimilarityDistance(code: string, langage: string): Promise<void>;
    tokenizeJavascript(code: string): string;
    tokenizePython(code: string): string;
}

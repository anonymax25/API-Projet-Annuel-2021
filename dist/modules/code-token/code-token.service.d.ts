import { ConfigService } from "@nestjs/config";
import { Repository } from "typeorm";
import { TokenCode } from "./code-token.entity";
export declare class TokenCodeSaveService {
    private tokenCodeSaveRepository;
    private readonly configService;
    constructor(tokenCodeSaveRepository: Repository<TokenCode>, configService: ConfigService);
    saveToken(ownerId: number, code: string, langage: string): Promise<TokenCode>;
    deleteCode(id: number): Promise<import("typeorm").DeleteResult>;
    getLowestSimilarityDistance(code: string, langage: string): Promise<number>;
    tokenizeJavascript(code: string): string;
    tokenizePython(code: string): string;
    levenshteinDistance(str1: string, str2: string): number;
}

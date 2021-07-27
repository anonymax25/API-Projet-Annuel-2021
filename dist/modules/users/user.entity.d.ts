import Code from '../code-save/code-save.entity';
import { TokenCode } from '../code-token/code-token.entity';
import PrivateFile from '../private-files/private-file.entity';
import { BaseEntity } from 'typeorm';
export declare class User extends BaseEntity {
    id: number;
    email: string;
    name: string;
    password: string;
    resultKey: string;
    files: PrivateFile[];
    codes: Code[];
    tokens: TokenCode[];
}

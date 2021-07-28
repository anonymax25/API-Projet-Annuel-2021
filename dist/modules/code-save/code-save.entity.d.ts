import { User } from '../users/user.entity';
import { BaseEntity } from 'typeorm';
import { Languages } from '../code-executor/entity/languages.enum';
declare class Code extends BaseEntity {
    id: number;
    name: string;
    code: string;
    language: Languages;
    isPrivate: boolean;
    owner: User;
    constructor(id: number, name: string, code: string, owner: User);
}
export default Code;

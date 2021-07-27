import { User } from '../users/user.entity';
import { BaseEntity } from 'typeorm';
declare class Code extends BaseEntity {
    id: number;
    name: string;
    code: string;
    owner: User;
    constructor(id: number, name: string, code: string, owner: User);
}
export default Code;

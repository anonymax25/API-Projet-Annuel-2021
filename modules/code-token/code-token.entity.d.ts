import { User } from '../users/user.entity';
import { BaseEntity } from 'typeorm';
export declare class TokenCode extends BaseEntity {
    id: number;
    token: string;
    langage: string;
    owner: User;
}

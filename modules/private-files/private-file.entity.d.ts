import { User } from '../users/user.entity';
import { BaseEntity } from 'typeorm';
declare class PrivateFile extends BaseEntity {
    id: number;
    key: string;
    owner: User;
}
export default PrivateFile;

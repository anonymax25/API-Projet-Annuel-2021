import { User } from 'modules/users/user.entity';
import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
 
@Entity()
class PrivateFile extends BaseEntity{
  @PrimaryGeneratedColumn()
  public id: number;
 
  @Column()
  public key: string;
 
  @ManyToOne(() => User, (owner: User) => owner.files)
  public owner: User;
}
 
export default PrivateFile;

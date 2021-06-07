import { User } from 'modules/users/user.entity';
import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
 
@Entity()
class Code extends BaseEntity{
  @PrimaryGeneratedColumn()
  public id: number;
 
  @Column()
  public name: string;

  @Column()
  public code: string;
 
  @ManyToOne(() => User, (owner: User) => owner.files)
  public owner: User;
}
 
export default Code;
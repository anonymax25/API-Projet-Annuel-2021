import { User } from '../users/user.entity';
import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
 
@Entity()
export class TokenCode extends BaseEntity{
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public token: string;

  @Column()
  public langage: string;
  
  @Column()
  public codeId: number;
 
  @ManyToOne(() => User, (owner: User) => owner.files)
  public owner: User;
}
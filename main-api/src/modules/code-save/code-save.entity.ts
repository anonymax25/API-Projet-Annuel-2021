import { User } from '../users/user.entity';
import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Languages } from 'modules/code-executor/entity/languages.enum';
 
@Entity()
class Code extends BaseEntity{
  @PrimaryGeneratedColumn()
  public id: number;
 
  @Column()
  public name: string;

  @Column()
  public code: string;
  
  @Column()
  public language: Languages;
  
  @Column()
  public isPrivate: boolean;
 
  @ManyToOne(() => User, (owner: User) => owner.files)
  public owner: User;

  constructor(id: number, name: string, code: string, owner: User){
    super()
    this.id = id
    this.name = name
    this.code = code
    this.owner = owner
  }
}
 
export default Code;
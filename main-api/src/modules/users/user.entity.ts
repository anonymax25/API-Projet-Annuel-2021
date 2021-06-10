import Code from 'modules/code-save/code-save.entity';
import PrivateFile from 'modules/private-files/private-file.entity';
import { BaseEntity, Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ unique: true })
  public email: string;

  @Column({ unique: true })
  public name: string;

  @Column()
  public password: string;
  
  @Column({nullable: true})
  public resultKey: string;

  @OneToMany(
    () => PrivateFile,
    (file: PrivateFile) => file.owner
  )
  public files: PrivateFile[];

  @OneToMany(
    () => Code,
    (code: Code) => code.owner
  )
  public codes: Code[];
}
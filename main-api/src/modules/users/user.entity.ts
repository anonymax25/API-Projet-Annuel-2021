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

  @OneToMany(
    () => PrivateFile,
    (file: PrivateFile) => file.owner
  )
  public files: PrivateFile[];
}
// models/Directory.ts
import { Table, Column, Model, ForeignKey } from 'sequelize-typescript';
import { User } from './user';

@Table
export class Directory extends Model<Directory> {
  @Column
  name!: string;

  @ForeignKey(() => User)
  @Column
  userId!: number;

}

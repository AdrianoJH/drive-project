// models/File.ts
import { Table, Column, Model, ForeignKey } from 'sequelize-typescript';
import { User } from './user';
import { Directory } from './directory';

@Table
export class File extends Model<File> {
  @Column
  name!: string;

  @ForeignKey(() => User)
  @Column
  userId!: number;

  @ForeignKey(() => Directory)
  @Column
  directoryId!: number;

}

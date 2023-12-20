// models/Permission.ts
import { Table, Column, Model } from 'sequelize-typescript';

@Table
export class Permission extends Model<Permission> {
  @Column
  name!: string;
}

// models/User.ts
import { Table, Column, Model, HasMany } from 'sequelize-typescript';
import { UserRole } from './userRole';

@Table
export class User extends Model<User> {
  @Column
  username!: string;

  @Column
  password!: string;

  @HasMany(() => UserRole)
  UserRoles!: UserRole[];
}

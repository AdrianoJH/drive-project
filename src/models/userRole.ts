// models/UserRole.ts
import { Table, Model, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { User } from './user';
import { Role } from './role';

@Table
export class UserRole extends Model<UserRole> {
  @ForeignKey(() => User)
  userId!: number;

  @BelongsTo(() => User)
  user!: User;

  @ForeignKey(() => Role)
  roleId!: number;

  @BelongsTo(() => Role) 
  role!: Role;

}

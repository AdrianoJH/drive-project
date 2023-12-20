// models/Role.ts
import { Table, Column, Model, BelongsToMany } from 'sequelize-typescript';
import { Permission } from './permission';
import { RolePermission } from './rolePermission';
import { User } from './user';
import { UserRole } from './userRole';

@Table
export class Role extends Model<Role> {
  @Column
  name!: string;

  @BelongsToMany(() => Permission, () => RolePermission)
  RolePermissions!: RolePermission[];

  // Adicione a associação BelongsToMany para UserRoles
  @BelongsToMany(() => User, () => UserRole)
  UserRoles!: UserRole[];
}

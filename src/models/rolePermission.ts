// models/RolePermission.ts
import { Table, Model, ForeignKey } from 'sequelize-typescript';
import { Role } from './role';
import { Permission } from './permission';

@Table
export class RolePermission extends Model<RolePermission> {
  @ForeignKey(() => Role)
  roleId!: number;

  @ForeignKey(() => Permission)
  permissionId!: number;
}

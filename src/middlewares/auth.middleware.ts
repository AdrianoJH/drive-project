// middlewares/auth.middleware.ts
import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../services/auth.service';
import { User } from '../models/user';
import { UserRole } from '../models/userRole';
import { RolePermission } from '../models/rolePermission';
import { Role } from '../models/role';

export async function authenticateToken(req: Request, res: Response, next: NextFunction): Promise<void> {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    res.status(401).json({ message: 'Token não fornecido' });
    return;
  }

  const decodedToken = verifyToken(token);

  if (!decodedToken) {
    res.status(401).json({ message: 'Token inválido' });
    return;
  }

  const user = await User.findByPk(decodedToken.userId, {
    include: [
      {
        model: UserRole,
        attributes: [],
        include: [
          {
            model: Role,
            attributes: [],
            include: [
              {
                model: RolePermission,
                attributes: ['permissionId'],
              },
            ],
          },
        ],
      },
    ],
  });

  if (!user) {
    res.status(401).json({ message: 'Usuário não encontrado' });
    return;
  }

  req.body.userId = decodedToken.userId;
  req.body.userPermissions = user.UserRoles.map((userRole) =>
    userRole.role.RolePermissions.map((rolePermission) => rolePermission.permissionId)
  ).flat();

  next();
}

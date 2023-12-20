// src/index.ts
import express, { Application, Request, Response } from 'express';
import sequelize from './config/database';
import { authenticateToken } from './middlewares/auth.middleware';
import { generateToken } from './services/auth.service';
import { User } from './models/user';
import { UserRole } from './models/userRole';
import { Role } from './models/role';
import { Permission } from './models/permission';
import { RolePermission } from './models/rolePermission';

const app: Application = express();
const port = 3000;

sequelize.addModels([User, Role, UserRole, Permission, RolePermission]);

sequelize.sync({ force: true }).then(() => {
  console.log('Banco de dados sincronizado.');
});

app.use(express.json());

// Rota de login para obter o token JWT
app.post('/login', async (req: Request, res: Response) => {
    const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Informe nome de usuário e senha' });
  }

  try {
    // Verifique se o usuário existe no banco de dados
    const user = await User.findOne({ where: { username } });

    if (!user || user.password !== password) {
      return res.status(401).json({ message: 'Credenciais inválidas' });
    }

    // Gere um token usando o serviço de autenticação
    const token = generateToken(user.id);
    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
});

// Rota protegida com autenticação JWT
app.get('/protected', authenticateToken, (req: Request, res: Response) => {
  // A partir deste ponto, você tem acesso ao ID do usuário autenticado em req.body.userId
  res.json({ message: 'Rota protegida acessada com sucesso!' });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

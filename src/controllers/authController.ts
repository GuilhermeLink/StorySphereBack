// authController.ts

import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

interface User {
  id: number;
  username: string;
  email: string;
  password: string;
}

// Simulação de um banco de dados de usuários
const users: User[] = [
  { id: 1, username: 'exampleUser', email: 'example@email.com', password: 'secretpassword' },
  // Adicione mais usuários conforme necessário
];

export const login = (req: Request, res: Response) => {
  const { email, password } = req.body;

  // Encontrar o usuário pelo e-mail
  const user = users.find((u) => u.email === email);

  // Verificar se o usuário existe e a senha está correta
  if (user && user.password === password) {
    // Gerar token JWT
    const token = jwt.sign({ user }, 'secretpassword', { expiresIn: '1h' });

    return res.json({ token });
  }

  // Se as credenciais estiverem incorretas
  return res.status(401).json({ message: 'Invalid credentials' });
};

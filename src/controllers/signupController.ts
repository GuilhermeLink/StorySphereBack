// authController.ts
import { Request, Response } from 'express';

interface User {
  id: number;
  username: string;
  email: string;
  password: string;
}

// Simulação de um banco de dados de usuários
const users: User[] = [];

export const signup = (req: Request, res: Response) => {
  const { username, email, password, confirmPassword } = req.body;

  // Verificar se o nome de usuário já está em uso
  if (users.some((user) => user.username === username)) {
    return res.status(400).json({ message: 'Username is already in use' });
  }

  // Verificar se o e-mail já está em uso
  if (users.some((user) => user.email === email)) {
    return res.status(400).json({ message: 'Email is already in use' });
  }

  // Verificar se as senhas coincidem
  if (password !== confirmPassword) {
    return res.status(400).json({ message: 'Passwords do not match' });
  }

  // Criar um novo usuário
  const newUser: User = {
    id: users.length + 1,
    username,
    email,
    password, // Normalmente, você armazenaria senhas criptografadas no banco de dados
  };

  // Adicionar o novo usuário ao banco de dados
  users.push(newUser);

  // Responder com sucesso
  return res.json({ message: 'User registered successfully' });
};
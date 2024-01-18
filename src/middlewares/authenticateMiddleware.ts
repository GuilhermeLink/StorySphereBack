// authenticateMiddleware.js
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

// Estenda a interface do Request
interface AuthenticatedRequest extends Request {
  user?: any; // ou substitua 'any' pelo tipo do usuário se você tiver um tipo específico
}

// Middleware para autenticação
const authenticateMiddleware = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    const decoded: any = jwt.verify(token, 'secretpassword');
    req.user = decoded.user;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};

export default authenticateMiddleware;
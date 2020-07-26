import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

import AppError from '@shared/errors/AppError';
import authConfig from '@config/auth';

interface ITokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

export default function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
): void {
  // Validação do token JWT
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError('JWT token is missing', 401);
  }

  // Bearer token
  const [, token] = authHeader.split(' '); // Se eu deixar a primeira posição vazia, quer dizer que não vou usar a variável (aqui o type = 'Bearer')

  const { secret } = authConfig.jwt;

  try {
    const decoded = verify(token, secret) as ITokenPayload;

    const { sub } = decoded;

    // Adicionando à Request a informação do usuário autenticado.
    // Nos próximos middlewares e nas rotas que utilizam esse middleware, agora tenho a informação do usuário em request.user!!
    request.user = {
      id: sub,
    };

    return next();
  } catch {
    throw new AppError('Invalid JWT token', 401);
  }
}

import { sign } from 'jsonwebtoken';

import AppError from '@shared/errors/AppError';
import authConfig from '@config/auth';
import { injectable, inject } from 'tsyringe';
import User from '../infra/typeorm/entities/User';
import IUsersRepository from '../repositories/IUsersRepository';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: User;
  token: string;
}

@injectable()
class AuthenticateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({ email, password }: IRequest): Promise<IResponse> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('Incorrect e-mail/password combination.', 401);
    }

    // user.password - Senha criptografada
    // password - Senha não criptografada de tentativa de login

    const passwordMatched = await this.hashProvider.compareHash(
      password,
      user.password,
    );

    if (!passwordMatched) {
      throw new AppError('Incorrect e-mail/password combination.', 401);
    }

    // Usuário autenticado

    const { secret, expiresIn } = authConfig.jwt;

    // Primeiro parâmetro é o payload: informações do usuário que eu possa utilizar depois (não pode colocar informações sensitivas), não é seguro
    // Segundo parâmetro é uma chave secreta (secret)
    // Terceiro parâmetro: configurações de nosso token
    const token = sign({}, secret, {
      subject: user.id, // o id do usuário que gerou esse token
      expiresIn, // quanto tempo o token dura? 1 dia aqui
    });

    return {
      user,
      token,
    };
  }
}

export default AuthenticateUserService;

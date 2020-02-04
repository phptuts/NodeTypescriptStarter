import { User } from '../entities/user.entity';
import { getRepository } from 'typeorm';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { LoginModel } from '../model/request/login.model';

export const authenticateRequest = async (
  request: LoginModel
): Promise<string | false> => {
  const user = await getRepository(User).findOne({ email: request.email });

  if (!user || !user.password) {
    return false;
  }

  const validPassword = bcrypt.compare(request.password, user.password);

  if (!validPassword) {
    return false;
  }

  return jwt.sign({ id: user.id, email: user.email }, 'secret');
};

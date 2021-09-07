import * as bcrypt from 'bcrypt';
import { Repository } from 'sequelize-typescript';
import * as sequelize from 'sequelize';

import { User } from '../modules/common/entities/users/user.entity';

export const createPasswordHash = async (password: string): Promise<string> => {
  const saltRounds = 10;
  const salt = await bcrypt.genSalt(saltRounds);
  const hash = await bcrypt.hash(password, salt);
  return hash;
};

export const checkPassword = async (oldPassword: string, newPassword: string): Promise<boolean> => {
  return bcrypt.compare(newPassword, oldPassword);
};

export const checkPasswordComplexity = async (password: string): Promise<boolean> => {
  const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?\-_.,\\/`~'"<>(){}^№;|])[A-Za-z\d#$@!%&*?\-_.,\\/`~'"<>(){}^№;|]{8,}$/;
  return re.test(password);
};

export const generateLogin = async (
  email: string,
  usersRepository: Repository<User>
): Promise<string> => {
  const baseLogin = email.split('@')[0];
  const { Op } = sequelize;
  let counter = 0;
  let newLogin = baseLogin;
  const loginTemplate = baseLogin.replace('.', '\\.');
  const searchRegExp = `^${loginTemplate}\\d*$`;
  const users = await usersRepository.findAll({
    where: {
      login: {
        [Op.regexp]: searchRegExp,
      },
    },
    order: [['login', 'ASC']],
  });

  if (users.length) {
    users.map(user => {
      if (user.login === newLogin) {
        counter += 1;
        newLogin = `${baseLogin}${counter}`;
        return user;
      }

      return user;
    });
  }

  return newLogin;
};

export const generatePassword = async (): Promise<string> => {
  return Math.random()
    .toString(36)
    .slice(-8);
};

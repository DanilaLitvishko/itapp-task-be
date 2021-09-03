import { JWTConfig } from 'config/interfaces/jwt.interface';
import * as dotenv from 'dotenv';

dotenv.config();

const jwtConfig: JWTConfig = {
  development: {
    secret: process.env.JWT_SECRET || 'jwt .secret ./never be detected',
    expiresIn: '7d',
  },
  production: {
    secret: process.env.JWT_SECRET || 'jwt .secret ./never be detected',
    expiresIn: '7d',
  },
  test: {
    secret: process.env.JWT_SECRET || 'jwt .secret ./never be detected',
    expiresIn: '7d',
  },
};

module.exports = jwtConfig;

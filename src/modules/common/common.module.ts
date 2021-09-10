import { HttpModule, Module } from '@nestjs/common';

import { controllers } from 'src/modules/common/controllers';
import { providers } from 'src/modules/common/providers';
import { strategies } from 'src/modules/common/strategies';
import configuration from 'config/configuration';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersRepository } from './repositories/users/users.repository';
import { services } from './services';

const config = configuration();

@Module({
  imports: [
    HttpModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: config.jwt.secret,
      signOptions: { expiresIn: config.jwt.expiresIn },
    }),
    TypeOrmModule.forFeature([UsersRepository]),
  ],
  controllers: [...controllers],
  providers: [...providers, ...services, ...strategies],
  exports: [...Object.values(services), ...providers],
})
export class CommonModule {}

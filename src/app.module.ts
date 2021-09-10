import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { TypeOrmModule } from '@nestjs/typeorm';

import { exceptionsProviders } from 'src/exceptions/providers/exeptions.providers';
import configuration from 'config/configuration';
import { CommonModule } from 'src/modules/common/common.module';

const config = configuration();

const modules = [CommonModule];

@Module({
  imports: [
    ScheduleModule.forRoot(),
    ConfigModule.forRoot({
      isGlobal: true,
      ignoreEnvFile: true,
      load: [configuration],
    }),
    TypeOrmModule.forRoot(),
    ...modules,
  ],
  providers: [...exceptionsProviders],
})
export class AppModule {}

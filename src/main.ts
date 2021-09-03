import * as dotenv from 'dotenv';
import { NestFactory } from '@nestjs/core';
import * as helmet from 'helmet';

import { ValidationPipe } from 'src/validation/pipes/validation.pipe';
import { AppModule } from './app.module';
import { RequestContextClass } from './context/requestContext.class';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // const configService = app.get('ConfigService');
  app.useGlobalPipes(new ValidationPipe());
  // app.enableCors({ origin: configService.internalConfig.frontendDomain });
  app.use(helmet());
  app.use(async (req: any) => {
    RequestContextClass.setRequest(req);
    return req.next();
  });
  await app.listen(3000);
}
bootstrap();

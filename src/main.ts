require('dotenv').config();
import { NestFactory } from '@nestjs/core';
import appConfig from '../configs/app.config';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: console,
    cors: true,
  });
  await app.listen(appConfig().port, () => {
    console.log(
      `Server running on http://localhost:${process.env.PORT || 3000}`,
    );
    console.log(
      `GraphQL running on http://localhost:${process.env.PORT || 3000}/graphql`,
    );
  });
}
bootstrap();

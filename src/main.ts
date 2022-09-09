import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: console,
  });
  await app.listen(process.env.PORT || 3000, () => {
    console.log(
      `Server running on http://localhost:${process.env.PORT || 3000}`,
    );
    console.log(
      `GraphQL running on http://localhost:${process.env.PORT || 3000}/graphql`,
    );
  });
}
bootstrap();
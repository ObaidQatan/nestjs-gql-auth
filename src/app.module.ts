import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import jwtConfig from '../configs/jwt.config';
import appConfig from '../configs/app.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      // envFilePath: ['.env', '.env.local'],
      // load: [jwtConfig, appConfig],
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.graphql'),
      sortSchema: true,
      cors: {
        origin: '*',
        credentials: true,
      },
    }),
    UsersModule,
    AuthModule,
  ],
})
export class AppModule {}

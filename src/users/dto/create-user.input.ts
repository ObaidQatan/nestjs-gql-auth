import { InputType, Field } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';

@InputType()
export class CreateUserInput implements Prisma.UserCreateInput {
  @Field()
  username: string;

  @Field()
  password: string;
}

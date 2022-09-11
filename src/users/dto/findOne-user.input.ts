import { Field } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';

export class FindOneUserInput implements Prisma.UserWhereInput {
  @Field()
  id?: string;

  @Field()
  username: string;
}

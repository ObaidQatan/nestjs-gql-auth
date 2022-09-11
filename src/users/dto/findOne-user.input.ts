import { Field, InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';

@InputType()
export class FindOneUserInput implements Prisma.UserWhereInput {
  @Field()
  id?: string;

  @Field()
  username: string;
}

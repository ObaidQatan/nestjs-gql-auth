import { Field } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';

export class OrderByUserInput implements Prisma.UserOrderByWithRelationInput {
  @Field()
  id?: Prisma.SortOrder;

  @Field()
  username?: Prisma.SortOrder;

  @Field()
  password?: Prisma.SortOrder;
}

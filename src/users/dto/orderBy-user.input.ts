import { Field, InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';

@InputType()
export class OrderByUserInput {
  @Field()
  field: Prisma.UserScalarFieldEnum;

  @Field()
  direction: Prisma.SortOrder;
}

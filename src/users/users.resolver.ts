import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { UseGuards } from '@nestjs/common';
import { JWTAuthGuard } from '../auth/jwt-auth.guard';
import { CreateUserInput } from './dto/create-user.input';
import { FindOneUserInput } from './dto/findOne-user.input';
import { OrderByUserInput } from './dto/orderBy-user.input';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Mutation(() => User, { name: 'users' })
  createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    return this.usersService.create(createUserInput);
  }

  @Query(() => [User], { name: 'users' })
  @UseGuards(JWTAuthGuard)
  findAll(@Args('orderBy') orderBy?: OrderByUserInput) {
    return this.usersService.findAll(orderBy);
  }

  @Query(() => User, { name: 'user' })
  @UseGuards(JWTAuthGuard)
  findOne(@Args('findOneUserInput') findOneUserInput: FindOneUserInput) {
    return this.usersService.findOne(findOneUserInput);
  }

  // @Mutation(() => User)
  // updateUser(@Args('updateUserInput') updateUserInput: UpdateUserInput) {
  //   return this.usersService.update(updateUserInput.id, updateUserInput);
  // }

  // @Mutation(() => User)
  // removeUser(@Args('id', { type: () => Int }) id: number) {
  //   return this.usersService.remove(id);
  // }
}

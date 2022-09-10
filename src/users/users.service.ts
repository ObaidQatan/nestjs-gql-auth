import { Injectable } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import * as bcrypt from 'bcrypt';
import { randomUUID } from 'crypto';

@Injectable()
export class UsersService {
  private readonly users = [
    {
      id: randomUUID({
        disableEntropyCache: true,
      }),
      username: 'John Doe',
      password: bcrypt.hashSync('123456', 10),
    },
    {
      id: randomUUID({
        disableEntropyCache: true,
      }),
      username: 'Steve Smith',
      password: bcrypt.hashSync('654321', 10),
    },
  ];

  async create(createUserInput: CreateUserInput) {
    const existUser = this.users.find(
      (user) => user.username === createUserInput.username,
    );
    if (existUser) {
      throw new Error('User already exists');
    }
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(createUserInput.password, salt);
    const user = {
      username: createUserInput.username,
      password: hashedPassword,
      id: randomUUID({
        disableEntropyCache: true,
      }),
    };
    this.users.push(user);
    return user;
  }

  findAll() {
    return this.users;
  }

  findOne(username: string) {
    const user = this.users.find((user) => user.username === username);
    return user;
  }

  // update(id: number, updateUserInput: UpdateUserInput) {
  //   return `This action updates a #${id} user`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} user`;
  // }
}

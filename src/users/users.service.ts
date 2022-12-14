import { Injectable } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma.service';
import { FindOneUserInput } from './dto/findOne-user.input';
import { OrderByUserInput } from './dto/orderBy-user.input';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}
  // private readonly users = [
  //   {
  //     id: randomUUID({
  //       disableEntropyCache: true,
  //     }),
  //     username: 'John Doe',
  //     password: bcrypt.hashSync('123456', 10),
  //   },
  //   {
  //     id: randomUUID({
  //       disableEntropyCache: true,
  //     }),
  //     username: 'Steve Smith',
  //     password: bcrypt.hashSync('654321', 10),
  //   },
  // ];

  async create(createUserInput: CreateUserInput) {
    const existUser = await this.prisma.user.findUnique({
      where: {
        username: createUserInput.username,
      },
    });
    if (existUser) {
      throw new Error('User already exists');
    }
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(createUserInput.password, salt);
    return await this.prisma.user.create({
      data: {
        username: createUserInput.username,
        password: hashedPassword,
      },
    });
  }

  async findAll(orderBy?: OrderByUserInput) {
    return await this.prisma.user.findMany({
      orderBy: {
        [orderBy?.field || 'createdAt']: orderBy?.direction || 'asc',
      },
    });
  }

  async findOne(findOneUserInput: FindOneUserInput) {
    const user = await this.prisma.user.findUnique({
      where: findOneUserInput,
    });
    return user;
  }

  // update(id: number, updateUserInput: UpdateUserInput) {
  //   return `This action updates a #${id} user`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} user`;
  // }
}

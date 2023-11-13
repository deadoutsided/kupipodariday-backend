import { Injectable, BadRequestException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}
  async create(createUserDto: CreateUserDto) {
    createUserDto.password = await bcrypt.hash(createUserDto.password, 10);
    const newUser = await this.userRepository.save(createUserDto);
    return newUser;
  }

  async findOneByUsername(username: string) {
    const user = await this.userRepository.findOneBy({
      username,
    });
    return user;
  }

  async findOneById(id: number) {
    const user = await this.userRepository.findOneBy({ id });
    delete user.password;
    return user;
  }

  async updateById(id: number, updateUserDto: UpdateUserDto, user) {
    console.log(updateUserDto);
    if (updateUserDto.username || updateUserDto.email) {
      const usernameMayExist = updateUserDto.username
        ? await this.userRepository.findOne({
            where: { username: updateUserDto.username },
          })
        : false;
      const emailMayExist = updateUserDto.email
        ? await this.userRepository.findOne({
            where: { email: updateUserDto.email },
          })
        : false;
      console.log(user);
      if (
        (usernameMayExist && usernameMayExist.id !== user.id) ||
        (emailMayExist && emailMayExist?.id !== user.id)
      ) {
        throw new BadRequestException(
          'User with this username or email already exist',
        ).getResponse();
      }
    }
    if (updateUserDto.password) {
      updateUserDto.password = await bcrypt.hash(updateUserDto.password, 10);
    }
    await this.userRepository.update({ id }, updateUserDto);
    const updated = await this.findOneById(id);
    delete updated.password;
    return updated;
  }

  async findByIdWithWishes(id: number) {
    const userWithWishes = await this.userRepository.findOne({
      where: {
        id,
      },
      relations: {
        wishes: true,
      },
    });
    return userWithWishes;
  }

  async findByUsernameWithWishes(username: string) {
    const userWithWishes = await this.userRepository.findOne({
      where: {
        username,
      },
      relations: {
        wishes: true,
      },
    });
    return userWithWishes;
  }

  async findMany(query: string) {
    return await this.userRepository.find({
      where: [{ username: query }, { email: query }],
    });
  }
}

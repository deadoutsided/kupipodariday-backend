import { Injectable } from '@nestjs/common';
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

  /* findAll() {
    return `This action returns all users`;
  } */

  async findOneByUsername(username: string) {
    const user = await this.userRepository.findOneBy({
      username,
    });
    return user;
  }

  async findOneById(id: number) {
    const user = await this.userRepository.findOneBy({ id });
    return user;
  }

  async updateById(id: number, updateUserDto: UpdateUserDto) {
    const updatedUser = await this.userRepository.update({ id }, updateUserDto);
    return updatedUser;
  }

  async findUserWithWishes(id: number) {
    const userWithWishes = await this.userRepository.find({
      where: {
        id,
      },
      relations: {
        wishes: true,
      },
    });
    return userWithWishes;
  }

  /* update(id: number, updateUserDto: UpdateUserDto) {
    return this.userRepository.update({ id }, updateUserDto);
  } */

  /* remove(id: number) {
    return this.userRepository.remove;
  } */
}

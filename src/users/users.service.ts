import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { UserProfileResponseDto } from './dto/user-profile-response.dto';

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

  async updateById(
    id: number,
    updateUserDto: UpdateUserDto,
  ): Promise<UserProfileResponseDto> {
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
    //findUserDto: FindUserDto
    return await this.userRepository.find({
      where: [{ username: query }, { email: query }],
    });
  }
}

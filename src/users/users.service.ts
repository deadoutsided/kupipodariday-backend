import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}
  create(createUserDto: CreateUserDto) {
    return this.userRepository.save(createUserDto);
  }

  /* findAll() {
    return `This action returns all users`;
  } */

  findOneByUsername(username: string) {
    return this.userRepository.findOneBy({
      username,
    });
  }

  findOneById(id: number) {
    return this.userRepository.findOneBy({
      id,
    });
  }

  updateById(id: number, updateUserDto: UpdateUserDto) {
    return this.userRepository.update({ id }, updateUserDto);
  }

  findUserWithWishes(id: number) {
    return this.userRepository.find({
      where: {
        id,
      },
      relations: {
        wishes: true,
      },
    });
  }

  /* update(id: number, updateUserDto: UpdateUserDto) {
    return this.userRepository.update({ id }, updateUserDto);
  } */

  /* remove(id: number) {
    return this.userRepository.remove;
  } */
}

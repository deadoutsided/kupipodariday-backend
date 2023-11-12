import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateWishDto } from './dto/create-wish.dto';
import { UpdateWishDto } from './dto/update-wish.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Wish } from './entities/wish.entity';
import { UserProfileResponseDto } from 'src/users/dto/user-profile-response.dto';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class WishesService {
  constructor(
    @InjectRepository(Wish)
    private wishRepository: Repository<Wish>,
    /* @InjectRepository(User)
    private userRepository: Repository<User>, */
    private usersService: UsersService,
  ) {}
  async create(createWishDto: CreateWishDto) {
    const newWish = await this.wishRepository.save(createWishDto);
    return newWish;
  }

  /* findAll() {
    return `This action returns all wishes`;
  } */

  async findOne(id: number) {
    const wish = await this.wishRepository.findOneBy({ id });
    return wish;
  }

  async findOneWithOwner(id: number) {
    const wish = await this.wishRepository.findOne({
      where: { id },
      relations: { owner: true },
    });
    return wish;
  }

  async updateById(id: number, updateWishDto: UpdateWishDto) {
    return await this.wishRepository.update({ id }, updateWishDto);
  }

  async updateByIdVerified(
    id: number,
    updateWishDto: UpdateWishDto,
    user: UserProfileResponseDto,
  ) {
    const wish = await this.findOneWithOwner(id);
    if (wish.owner.id === user.id) {
      await this.wishRepository.update({ id }, updateWishDto);
      return this.findOne(id);
    }
    //const updatedWish = await this.wishRepository.update({ id }, updateWishDto);
    return new UnauthorizedException();
  }

  async delete(id: number, user: UserProfileResponseDto) {
    const wish = await this.findOneWithOwner(id);
    //console.log(wish);
    if (wish.owner.id === user.id) {
      return this.wishRepository.delete(id);
    } else return new UnauthorizedException();
    //const deletedWish = await this.wishRepository.delete(id);
    //return deletedWish;
  }

  async copy(id: number, user: UserProfileResponseDto) {
    const copyingWish = await this.wishRepository.findOneBy({ id });
    const copyingUser = await this.usersService.findOneById(user.id);
    const copied: CreateWishDto = {
      name: copyingWish.name,
      link: copyingWish.link,
      image: copyingWish.image,
      price: copyingWish.price,
      description: copyingWish.description,
      owner: copyingUser, //as i understand, here i should inject usersRepository and find copyind user to place him here
    };

    return this.wishRepository.create(copied);
  }

  async findTop() {
    return await this.wishRepository.find({
      order: {
        copied: 'DESC',
      },
      take: 20,
    });
  }

  async findLast() {
    return await this.wishRepository.find({
      order: {
        createdAt: 'DESC',
      },
      take: 40,
    });
  }
}

import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateWishDto } from './dto/create-wish.dto';
import { UpdateWishDto } from './dto/update-wish.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Wish } from './entities/wish.entity';
import { UserProfileResponseDto } from 'src/users/dto/user-profile-response.dto';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class WishesService {
  constructor(
    @InjectRepository(Wish)
    private wishRepository: Repository<Wish>,
    private usersService: UsersService,
  ) {}
  async create(createWishDto: CreateWishDto) {
    const newWish = await this.wishRepository.save(createWishDto);
    return newWish;
  }

  async findAll(options) {
    return await this.wishRepository.find(options);
  }

  async findAllUserWishes(id: number) {
    return await this.wishRepository.find({
      select: {
        id: true,
        price: true,
        image: true,
        name: true,
        raised: true,
        owner: {
          id: true,
        },
      },
      relations: {
        owner: true,
      },
      where: {
        owner: {
          id,
        },
      },
    });
  }

  async findWithOffers(id: number) {
    return await this.wishRepository.findOne({
      where: {
        id,
      },
      relations: {
        offers: true,
      },
    });
  }

  async findOne(id: number) {
    const wish = await this.wishRepository.findOneBy({ id });
    return wish;
  }

  async findOneWithOwner(id: number) {
    const wish = await this.wishRepository.findOne({
      where: { id },
      relations: { owner: true },
    });
    delete wish.owner.password;
    return wish;
  }

  async findOneWithOwnerAndOffers(id: number) {
    const wish = await this.wishRepository.findOne({
      where: { id },
      relations: { owner: true, offers: true },
    });
    delete wish.owner.password;
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
    const wishWithOffer = await this.findOneWithOwner(id);
    if (updateWishDto.price && wishWithOffer.offers.length !== 0) {
      return new BadRequestException(
        'You cant change price of wish, that already have offers',
      );
    }
    if (wish.owner.id === user.id) {
      await this.updateById(id, updateWishDto);
      return this.findOne(id);
    }
    return new UnauthorizedException();
  }

  async delete(id: number) {
    return await this.wishRepository.delete(id);
  }

  async deleteVerified(id: number, user: UserProfileResponseDto) {
    const wish = await this.findOneWithOwner(id);
    if (wish.owner.id === user.id) {
      const deletedWish = await this.findOne(id);
      await this.delete(id);
      return deletedWish;
    } else return new UnauthorizedException();
  }

  async copy(id: number, user: UserProfileResponseDto) {
    const copyingWish = await this.findOne(id);
    const copyingUser = await this.usersService.findOneById(user.id);
    const copied: CreateWishDto = {
      name: copyingWish.name,
      link: copyingWish.link,
      image: copyingWish.image,
      price: copyingWish.price,
      description: copyingWish.description,
      owner: copyingUser,
    };
    copyingWish.copied += 1;
    this.wishRepository.save(copyingWish);

    return this.create(copied);
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

import { Injectable, ForbiddenException } from '@nestjs/common';
import { CreateWishlistDto } from './dto/create-wishlist.dto';
import { UpdateWishlistDto } from './dto/update-wishlist.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Wishlist } from './entities/wishlist.entity';
import { WishesService } from 'src/wishes/wishes.service';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class WishlistsService {
  constructor(
    @InjectRepository(Wishlist)
    private wishlistRepository: Repository<Wishlist>,
    private wishService: WishesService,
    private usersService: UsersService,
  ) {}

  async create(createWishlistDto: CreateWishlistDto, user) {
    createWishlistDto.owner = await this.usersService.findOneById(user.id);
    const wishesIds = createWishlistDto.itemsId.map((wishId) => {
      return { id: wishId };
    });
    createWishlistDto.items = await this.wishService.findAll({
      where: wishesIds,
    });
    const newWishlist = await this.wishlistRepository.save(
      createWishlistDto as any,
    );
    return newWishlist;
  }

  async findAll() {
    const allWishlists = await this.wishlistRepository.find({
      order: {
        createdAt: 'DESC',
      },
    });
    return allWishlists;
  }

  async findAllWithOwners() {
    const allWishlists = await this.wishlistRepository.find({
      order: {
        createdAt: 'DESC',
      },
      relations: {
        owner: true,
      },
    });
    allWishlists.forEach((list) => delete list.owner.password);
    return allWishlists;
  }

  async findOne(id: number) {
    const wishlist = await this.wishlistRepository.findOneBy({ id });
    return wishlist;
  }

  async findOneWithWishes(id: number) {
    const wishlist = await this.wishlistRepository.findOne({
      select: {
        owner: {
          id: true,
        },
      },
      where: {
        id,
      },
      relations: {
        items: true,
        owner: true,
      },
    });
    return wishlist;
  }

  async update(id: number, updateWishlistDto: UpdateWishlistDto) {
    if (updateWishlistDto.items) {
      const wishesIds = updateWishlistDto.itemsId.map((wishId) => {
        return { id: wishId };
      });
      updateWishlistDto.items = await this.wishService.findAll({
        where: wishesIds,
      });
      console.log(updateWishlistDto.items);
      delete updateWishlistDto.items;
    }
    updateWishlistDto.id = id;
    const updatedWishlist = await this.wishlistRepository.save(
      updateWishlistDto as any,
    );
    return updatedWishlist;
  }

  async remove(id: number) {
    const deletedWishlist = await this.wishlistRepository.delete({ id });
    return deletedWishlist;
  }

  async findOneWhithOwner(id: number) {
    const wishlist = await this.wishlistRepository.findOne({
      where: {
        id,
      },
      relations: {
        owner: true,
      },
    });
    delete wishlist.owner.password;
    return wishlist;
  }

  async updateVerified(id: number, updateWishlistDto: UpdateWishlistDto, user) {
    const wishlist = await this.findOneWhithOwner(id);
    if (wishlist.owner.id !== user.id) {
      return new ForbiddenException('You cant update others wishlists');
    }
    await this.update(id, updateWishlistDto);
    return await this.findOne(id);
  }

  async deleteVerified(id: number, user) {
    const wishlist = await this.findOneWhithOwner(id);
    if (wishlist.owner.id !== user.id) {
      return new ForbiddenException('You cant delete others wishlists');
    }
    return await this.remove(id);
  }
}

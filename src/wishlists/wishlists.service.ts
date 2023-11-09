import { Injectable } from '@nestjs/common';
import { CreateWishlistDto } from './dto/create-wishlist.dto';
import { UpdateWishlistDto } from './dto/update-wishlist.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Wishlist } from './entities/wishlist.entity';

@Injectable()
export class WishlistsService {
  constructor(
    @InjectRepository(Wishlist)
    private wishlistRepository: Repository<Wishlist>,
  ) {}
  async create(createWishlistDto: CreateWishlistDto) {
    const newWishlist = await this.wishlistRepository.save(createWishlistDto);
    return newWishlist;
  }

  async findAll() {
    const allWishlists = await this.wishlistRepository.find();
    return allWishlists;
  }

  async findOne(id: number) {
    const wishlist = await this.wishlistRepository.findOneBy({ id });
    return wishlist;
  }

  async update(id: number, updateWishlistDto: UpdateWishlistDto) {
    const updatedWishlist = await this.wishlistRepository.update(
      { id },
      updateWishlistDto,
    );
    return updatedWishlist;
  }

  async remove(id: number) {
    const deletedWishlist = await this.wishlistRepository.delete({ id });
    return deletedWishlist;
  }
}

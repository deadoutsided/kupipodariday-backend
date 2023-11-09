import { Injectable } from '@nestjs/common';
import { CreateWishDto } from './dto/create-wish.dto';
import { UpdateWishDto } from './dto/update-wish.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Wish } from './entities/wish.entity';

@Injectable()
export class WishesService {
  constructor(
    @InjectRepository(Wish)
    private wishRepository: Repository<Wish>,
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

  async updateById(id: number, updateWishDto: UpdateWishDto) {
    const updatedWish = await this.wishRepository.update({ id }, updateWishDto);
    return updatedWish;
  }

  async delete(id: number) {
    const deletedWish = await this.wishRepository.delete(id);
    return deletedWish;
  }
}

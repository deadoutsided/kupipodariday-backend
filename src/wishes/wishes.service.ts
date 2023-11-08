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
  create(createWishDto: CreateWishDto) {
    return this.wishRepository.save(createWishDto);
  }

  /* findAll() {
    return `This action returns all wishes`;
  } */

  findOne(id: number) {
    return this.wishRepository.findOneBy({ id });
  }

  updateById(id: number, updateWishDto: UpdateWishDto) {
    return this.wishRepository.update({ id }, updateWishDto);
  }

  delete(id: number) {
    return this.wishRepository.delete(id);
  }
}

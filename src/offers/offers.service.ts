import { Injectable } from '@nestjs/common';
import { CreateOfferDto } from './dto/create-offer.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Offer } from './entities/offer.entity';

@Injectable()
export class OffersService {
  constructor(
    @InjectRepository(Offer)
    private offerRepository: Repository<Offer>,
  ) {}
  async create(createOfferDto: CreateOfferDto) {
    const newOffer = await this.offerRepository.save(createOfferDto);
    return newOffer;
  }

  async findAll() {
    const allWishes = await this.offerRepository.find();
    return allWishes;
  }

  async findOne(id: number) {
    const offer = await this.offerRepository.findOneBy({ id });
    return offer;
  }
  /*   update(id: number, updateOfferDto: UpdateOfferDto) {
    return `This action updates a #${id} offer`;
  }

  remove(id: number) {
    return `This action removes a #${id} offer`;
  } */
}

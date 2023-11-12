import {
  BadRequestException,
  Injectable,
  ForbiddenException,
} from '@nestjs/common';
import { CreateOfferDto } from './dto/create-offer.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Offer } from './entities/offer.entity';
import { WishesService } from 'src/wishes/wishes.service';
import { WishPartial } from 'src/wishes/dto/wish-partial.dto';

@Injectable()
export class OffersService {
  constructor(
    @InjectRepository(Offer)
    private offerRepository: Repository<Offer>,
    private wishesService: WishesService,
  ) {}
  async create(createOfferDto: CreateOfferDto) {
    const newOffer = await this.offerRepository.save(createOfferDto);
    return newOffer;
  }

  async findAll() {
    const allOffers = await this.offerRepository.find();
    return allOffers;
  }

  async findOne(id: number) {
    const offer = await this.offerRepository.findOneBy({ id });
    return offer;
  }

  async createValid(createOfferDto: CreateOfferDto, user) {
    const wish = await this.wishesService.findOne(createOfferDto.itemId);
    if (user.id === wish.owner.id) {
      return new BadRequestException(
        'Вы не можете скидываться на свой подарок',
      );
    } else if (
      wish.raised === wish.price ||
      wish.raised + createOfferDto.amount > wish.price
    ) {
      return new BadRequestException(
        'Нельзя собрать сумму, большую цены подарка',
      );
    }
    const newWishData: WishPartial = {
      raised: wish.raised + createOfferDto.amount,
    };
    this.wishesService.updateById(createOfferDto.itemId, newWishData);
    return this.create(createOfferDto);
  }

  async findExceptHidden() {
    const offersExceptHidden = await this.offerRepository.find({
      where: {
        hidden: false,
      },
    });
    return offersExceptHidden;
  }

  async findOneExceptHidden(id: number) {
    const offer = await this.findOne(id);
    if (offer.hidden) {
      return new ForbiddenException('User hided his offer');
    }
    return offer;
  }
}

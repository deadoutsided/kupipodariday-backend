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
import { UsersService } from 'src/users/users.service';

@Injectable()
export class OffersService {
  constructor(
    @InjectRepository(Offer)
    private offerRepository: Repository<Offer>,
    private wishesService: WishesService,
    private usersService: UsersService,
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
    const wish = await this.wishesService.findOneWithOwner(
      createOfferDto.itemId,
    );
    if (user.id === wish.owner.id) {
      throw new BadRequestException('Вы не можете скидываться на свой подарок');
    } else if (
      wish.raised === wish.price ||
      wish.raised + createOfferDto.amount > wish.price
    ) {
      throw new BadRequestException(
        'Нельзя собрать сумму, большую цены подарка',
      );
    }
    const newWishData: WishPartial = {
      raised: wish.raised + createOfferDto.amount,
    };
    const ownerOfOffer = this.usersService.findOneByUsername(user.username);
    createOfferDto.owner = await ownerOfOffer;
    createOfferDto.item = wish;
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
      throw new ForbiddenException('User hided his offer');
    }
    return offer;
  }
}

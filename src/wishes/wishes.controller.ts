import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { WishesService } from './wishes.service';
import { CreateWishDto } from './dto/create-wish.dto';
import { UpdateWishDto } from './dto/update-wish.dto';
import { JwtGuard } from 'src/auth/guards/jwt.guard';

@Controller('wishes')
export class WishesController {
  constructor(private readonly wishesService: WishesService) {}

  @UseGuards(JwtGuard)
  @Post()
  create(@Body() createWishDto: CreateWishDto, @Req() req) {
    //console.log(req.user);
    createWishDto.owner = req.user;
    return this.wishesService.create(createWishDto);
  }

  @Get('/last')
  async getLast() {
    return await this.wishesService.findLast();
  }

  @Get('/top')
  async getTop() {
    return await this.wishesService.findTop();
  }

  @UseGuards(JwtGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.wishesService.findOne(+id);
  }

  @UseGuards(JwtGuard)
  @Patch('/:id')
  async updateById(
    @Param('id') id: string,
    @Body() updateWishDto: UpdateWishDto,
    @Req() req,
  ) {
    return this.wishesService.updateByIdVerified(+id, updateWishDto, req.user);
  }

  @UseGuards(JwtGuard)
  @Delete(':id')
  async remove(@Param('id') id: string, @Req() req) {
    return this.wishesService.deleteVerified(+id, req.user);
  }

  /* @UseGuards(JwtGuard)
  @Get('/shi/:id')
  async findWithOffer(@Param('id') id: string) {
    return this.wishesService.findWithOffers(+id);
  } */

  @UseGuards(JwtGuard)
  @Post('/:id/copy')
  async copyWish(@Param('id') id: string, @Req() req) {
    return await this.wishesService.copy(+id, req.user);
  }
}

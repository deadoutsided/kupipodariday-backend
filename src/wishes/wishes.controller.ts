import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { WishesService } from './wishes.service';
import { CreateWishDto } from './dto/create-wish.dto';
import { UpdateWishDto } from './dto/update-wish.dto';

@Controller('wishes')
export class WishesController {
  constructor(private readonly wishesService: WishesService) {}

  @Post()
  create(@Body() createWishDto: CreateWishDto) {
    return this.wishesService.create(createWishDto);
  }

  /* TODO: Api dont have path for all, but have for top and last wish
  @Get()
  findAll() {
    return this.wishesService.findAll();
  } */

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.wishesService.findOne(+id);
  }

  @Patch('/:id')
  updateById(@Param('id') id: string, @Body() updateWishDto: UpdateWishDto) {
    return this.wishesService.updateById(+id, updateWishDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.wishesService.delete(+id);
  }

  /* TODO: should take user id from jwt token, i guess and copy found wish with his profile data
  @Post('/:id/copy')
  copyWish(@Param('id') id: string){
    
  } */
}

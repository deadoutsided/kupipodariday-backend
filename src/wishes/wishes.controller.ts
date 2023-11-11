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
  UnauthorizedException,
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

  /* TODO: Api dont have path for all, but have for top and last wish
  @Get()
  findAll() {
    return this.wishesService.findAll();
  } */

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.wishesService.findOne(+id);
  }

  @UseGuards(JwtGuard)
  @Patch('/:id')
  updateById(@Param('id') id: string, @Body() updateWishDto: UpdateWishDto) {
    return this.wishesService.updateById(+id, updateWishDto);
  }

  @UseGuards(JwtGuard)
  @Delete(':id')
  async remove(@Param('id') id: string, @Req() req) {
    const wish = await this.wishesService.findOne(+id);
    if (wish.owner === req.user) return this.wishesService.delete(+id);
    else return new UnauthorizedException();
  }

  /* TODO: should take user id from jwt token, i guess and copy found wish with his profile data
  @Post('/:id/copy')
  copyWish(@Param('id') id: string){
    
  } */
}

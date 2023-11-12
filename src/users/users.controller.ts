import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { UserProfileResponseDto } from './dto/user-profile-response.dto';
import { FindUserDto } from './dto/find-user.dto';
import { WishesService } from 'src/wishes/wishes.service';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private wishesService: WishesService,
  ) {}

  /* @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  } */

  @UseGuards(JwtGuard)
  @Get('/me')
  findSelf(@Req() req): UserProfileResponseDto {
    return req.user;
  }

  @UseGuards(JwtGuard)
  @Patch('/me')
  async updateSelf(@Req() req, @Body() updateUserDto: UpdateUserDto) {
    return await this.usersService.updateById(req.user.id, updateUserDto);
  }

  /* @UseGuards(JwtGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOneById(+id);
  } */

  @UseGuards(JwtGuard)
  @Get('/me/wishes')
  async findSelfWithWishes(@Req() req) {
    return await this.wishesService.findAllUserWishes(+req.user.id);
  }

  @UseGuards(JwtGuard)
  @Get('/:username')
  async findByUsername(@Param('username') username: string) {
    const user = await this.usersService.findOneByUsername(username);
    delete user.password;
    return user;
  }

  @UseGuards(JwtGuard)
  @Get('/:username/wishes')
  async findByIdWithWishes(@Param('username') username: string) {
    return await this.usersService.findByUsernameWithWishes(username);
  }

  @UseGuards(JwtGuard)
  @Post('/find')
  async findMany(
    @Body() findUserDto: FindUserDto,
  ): Promise<UserProfileResponseDto[]> {
    return await this.usersService.findMany(findUserDto.query);
  }
}

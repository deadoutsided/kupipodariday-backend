import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { UserProfileResponseDto } from './dto/user-profile-response.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @UseGuards(JwtGuard)
  @Get('/me')
  findSelf(@Req() req): UserProfileResponseDto {
    return req.user;
  }

  @UseGuards(JwtGuard)
  @Patch('/me')
  async updateSelf(@Req() req, @Body() updateUserDto: UpdateUserDto) {
    console.log(req.user);
    return await this.usersService.updateById(req.user.id, updateUserDto);
  }

  @Get('/:username')
  async findByUsername(@Param('username') username: string) {
    const user = await this.usersService.findOneByUsername(username);
    delete user.password;
    return user;
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOneById(+id);
  }
}

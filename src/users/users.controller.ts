import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get('/:username')
  async findByUsername(@Param('username') username: string) {
    const user = await this.usersService.findOneByUsername(username);
    delete user.password;
    return user;
  }

  /* @Get()
  findAll() {
    return this.usersService.findAll();
  } */

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOneById(+id);
  }

  /* @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  } */

  /* @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  } */
}

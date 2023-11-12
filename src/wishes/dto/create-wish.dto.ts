import { Transform } from 'class-transformer';
import {
  IsUrl,
  Length,
  IsNotEmpty,
  IsString,
  IsNumber,
  IsOptional,
} from 'class-validator';
import { User } from 'src/users/entities/user.entity';

export class CreateWishDto {
  @IsString()
  @IsNotEmpty()
  @Length(1, 250)
  name: string;

  @IsUrl()
  @IsNotEmpty()
  link: string;

  @IsNotEmpty()
  @IsUrl()
  image: string;

  @IsNumber()
  @Transform(({ value }) => Number(value))
  price: number;

  @IsNotEmpty()
  @Length(1, 1024)
  description: string;

  @IsOptional()
  owner: User;
}

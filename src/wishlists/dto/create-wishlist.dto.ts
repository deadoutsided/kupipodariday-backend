import {
  IsUrl,
  Length,
  IsNotEmpty,
  IsString,
  IsNumber,
  IsOptional,
} from 'class-validator';
import { User } from 'src/users/entities/user.entity';
import { Wish } from 'src/wishes/entities/wish.entity';

export class CreateWishlistDto {
  @IsString()
  @Length(1, 250)
  name: string;

  @IsString()
  @IsNotEmpty()
  @IsUrl()
  image: string;

  @IsOptional()
  @IsNumber({}, { each: true })
  itemsId?: number[];

  items: Wish[];

  owner?: User;

  @IsOptional()
  @IsNumber()
  id?: number;
}

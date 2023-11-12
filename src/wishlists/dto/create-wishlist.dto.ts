import {
  IsUrl,
  Length,
  IsNotEmpty,
  IsString,
  IsObject,
  IsNumber,
  IsOptional,
} from 'class-validator';
import { User } from 'src/users/entities/user.entity';
import { WishPartial } from 'src/wishes/dto/wish-partial.dto';
import { Wish } from 'src/wishes/entities/wish.entity';

export class CreateWishlistDto {
  @IsString()
  @Length(1, 250)
  name: string;

  @IsString()
  @IsNotEmpty()
  @IsUrl()
  image: string;

  /* @IsNumber({}, { each: true })
  itemsId: number[];  workd ver*/

  itemsId?: Wish[];

  /* @IsOptional()
  @IsObject({ each: true })
  items?: WishPartial[];  right ver*/
  @IsNumber({}, { each: true })
  items: number[];

  owner?: User;

  @IsNumber()
  id?: number;
}

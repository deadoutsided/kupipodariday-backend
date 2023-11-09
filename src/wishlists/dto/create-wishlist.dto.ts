import {
  IsUrl,
  Length,
  IsNumber,
  IsNotEmpty,
  IsString,
  Min,
} from 'class-validator';

export class CreateWishlistDto {
  @IsString()
  @Length(1, 250)
  name: string;

  @IsString()
  @IsNotEmpty()
  @IsUrl()
  image: string;

  @IsNumber({}, { each: true })
  @Min(1, { each: true })
  itemsId: number[];
}

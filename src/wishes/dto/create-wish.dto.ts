import { IsUrl, Length, IsNotEmpty, IsString, IsNumber } from 'class-validator';

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
  price: number;

  @IsNotEmpty()
  @Length(1, 1024)
  description: string;
}

import { IsOptional, IsUrl, Length, Min } from 'class-validator';

export class WishPartial {
  @IsOptional()
  @Min(0)
  id?: number;

  @IsOptional()
  createdAt?: Date;

  @IsOptional()
  updatedAt?: Date;

  @IsOptional()
  @Length(1, 250)
  name?: string;

  @IsOptional()
  @IsUrl()
  link?: string;

  @IsOptional()
  @IsUrl()
  image?: string;

  @IsOptional()
  @Min(1)
  price?: number;

  @IsOptional()
  @Min(0)
  raised?: number;

  @IsOptional()
  @Min(0)
  copied?: number;

  @IsOptional()
  @Length(1, 1024)
  description?: string;
}

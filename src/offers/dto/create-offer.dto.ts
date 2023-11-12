import { IsOptional, Min, IsDefined } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateOfferDto {
  @Min(1)
  @IsDefined()
  @Transform(({ value }) => Number(value))
  amount: number;

  @IsOptional()
  hidden: boolean;

  @IsDefined()
  @Transform(({ value }) => Number(value))
  @Min(1)
  itemId: number;
}

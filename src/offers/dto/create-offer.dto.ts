import { IsOptional, Min, IsDefined } from 'class-validator';

export class CreateOfferDto {
  @Min(1)
  @IsDefined()
  amount: number;

  @IsOptional()
  hidden: boolean;

  @IsDefined()
  @Min(1)
  itemId: number;
}

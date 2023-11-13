import { IsOptional, Min, IsDefined } from 'class-validator';
import { Transform } from 'class-transformer';
import { User } from 'src/users/entities/user.entity';
import { Wish } from 'src/wishes/entities/wish.entity';

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

  owner?: User;

  item?: Wish;
}

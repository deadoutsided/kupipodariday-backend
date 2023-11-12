import { Length, IsNotEmpty } from 'class-validator';
import { Transform } from 'class-transformer';

export class SigninDto {
  @Length(1, 64)
  @IsNotEmpty()
  username: string;

  @Length(2)
  @IsNotEmpty()
  password: string;
}

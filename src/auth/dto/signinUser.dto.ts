import { Length, IsNotEmpty } from 'class-validator';

export class SigninDto {
  @Length(1, 64)
  @IsNotEmpty()
  username: string;

  @Length(2)
  @IsNotEmpty()
  password: string;
}

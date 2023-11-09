import {
  IsUrl,
  Length,
  IsEmail,
  IsOptional,
  IsNotEmpty,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @Length(3, 64)
  username: string;

  @IsString()
  @IsOptional()
  @MaxLength(200)
  about: string;

  @IsOptional()
  @IsString()
  @IsUrl()
  avatar: string;

  @IsString()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}

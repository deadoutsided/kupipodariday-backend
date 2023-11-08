import {
  Length,
  IsNotEmpty,
  MaxLength,
  IsUrl,
  IsEmail,
  Min,
} from 'class-validator';

export class UserProfileResponseDto {
  @Min(1)
  id: number;

  @Length(3, 64)
  username: string;

  @MaxLength(200)
  about: string;

  @IsUrl()
  avatar: string;

  @IsUrl()
  email: string;

  createdAt: Date;
  updatedAt: Date;
}

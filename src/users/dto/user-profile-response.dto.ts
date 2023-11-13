import {
  Length,
  MaxLength,
  IsUrl,
  IsEmail,
  Min,
  IsDefined,
} from 'class-validator';

export class UserProfileResponseDto {
  @IsDefined()
  @Min(1)
  id: number;

  @IsDefined()
  @Length(3, 64)
  username: string;

  @IsDefined()
  @MaxLength(200)
  about: string;

  @IsDefined()
  @IsUrl()
  avatar: string;

  @IsDefined()
  @IsEmail()
  email: string;

  @IsDefined()
  createdAt: Date;

  @IsDefined()
  updatedAt: Date;
}

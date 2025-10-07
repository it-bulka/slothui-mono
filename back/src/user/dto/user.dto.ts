import { IsString, IsEmail, MinLength } from 'class-validator';
export class CreateUserDto {
  @IsString()
  @MinLength(6)
  password: string;

  @IsString()
  name: string;

  @IsString()
  nickname: string;

  @IsString()
  @IsEmail()
  email: string;
}

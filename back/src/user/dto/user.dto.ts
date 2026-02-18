import { IsString, IsEmail } from 'class-validator';
import { IsStrongPassword } from '../../common/validators/is-strong-password.decorator';
export class CreateUserDto {
  @IsStrongPassword()
  password: string;

  @IsString()
  username: string;

  @IsString()
  nickname: string;

  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  deviceId: string;
}

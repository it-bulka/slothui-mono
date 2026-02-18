import { IsStrongPassword } from '../../common/validators/is-strong-password.decorator';
import { IsString } from 'class-validator';

export class ResetPasswordDto {
  @IsStrongPassword()
  password: string;

  @IsString()
  token: string;
}

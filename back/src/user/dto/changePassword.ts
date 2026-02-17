import { IsString } from 'class-validator';
import { IsStrongPassword } from '../../common/validators/is-strong-password.decorator';

export class ChangePasswordDto {
  @IsString()
  oldPassword: string;

  @IsStrongPassword()
  newPassword: string;
}

import { IsString } from 'class-validator';
import { IsStrongPassword } from '../../common/validators/is-strong-password.decorator';
import { ApiProperty } from '@nestjs/swagger';

export class ChangePasswordDto {
  @ApiProperty({ example: 'OldPass123!' })
  @IsString()
  oldPassword: string;

  @ApiProperty({ example: 'NewStr0ng!Pass' })
  @IsStrongPassword()
  newPassword: string;
}

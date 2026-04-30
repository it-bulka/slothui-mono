import { IsStrongPassword } from '../../common/validators/is-strong-password.decorator';
import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ResetPasswordDto {
  @ApiProperty({ example: 'MyStr0ng!Pass' })
  @IsStrongPassword()
  password: string;

  @ApiProperty({ description: 'Reset token received via email' })
  @IsString()
  token: string;
}

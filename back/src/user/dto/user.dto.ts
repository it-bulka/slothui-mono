import { IsString, IsEmail } from 'class-validator';
import { IsStrongPassword } from '../../common/validators/is-strong-password.decorator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ example: 'MyStr0ng!Pass' })
  @IsStrongPassword()
  password: string;

  @ApiProperty({ example: 'john_doe' })
  @IsString()
  username: string;

  @ApiProperty({ example: 'John Doe' })
  @IsString()
  nickname: string;

  @ApiProperty({ example: 'john@example.com' })
  @IsString()
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'device-uuid-1234',
    description: 'Client device identifier for session tracking',
  })
  @IsString()
  deviceId: string;
}

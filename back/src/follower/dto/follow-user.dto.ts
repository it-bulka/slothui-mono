import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class FollowUserDto {
  @ApiProperty({
    example: 'uuid-user-1234',
    description: 'ID of the user to follow',
  })
  @IsString()
  @IsNotEmpty()
  userId: string;
}

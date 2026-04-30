import { User } from '../entities/user.entity';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export type UserResponse = Pick<
  User,
  'id' | 'username' | 'nickname' | 'role' | 'avatarUrl' | 'email' | 'bio'
>;

export interface UserShortDTO {
  id: string;
  username: string;
  nickname: string;
  avatarUrl?: string;
  email?: string;
}

export class UserResponseDto {
  @ApiProperty({ example: 'uuid-1234' })
  id: string;

  @ApiProperty({ example: 'john_doe' })
  username: string;

  @ApiProperty({ example: 'John Doe' })
  nickname: string;

  @ApiProperty({ example: 'user', enum: ['user', 'admin'] })
  role: string;

  @ApiPropertyOptional({
    example: 'https://res.cloudinary.com/demo/image/upload/avatar.jpg',
    nullable: true,
  })
  avatarUrl: string | null;

  @ApiProperty({ example: 'john@example.com' })
  email: string;

  @ApiPropertyOptional({
    example: 'Frontend developer passionate about UX',
    nullable: true,
  })
  bio: string | null;
}

export class UserShortDto {
  @ApiProperty({ example: 'uuid-1234' })
  id: string;

  @ApiProperty({ example: 'john_doe' })
  username: string;

  @ApiProperty({ example: 'John Doe' })
  nickname: string;

  @ApiPropertyOptional({
    example: 'https://res.cloudinary.com/demo/image/upload/avatar.jpg',
  })
  avatarUrl?: string;

  @ApiPropertyOptional({ example: 'john@example.com' })
  email?: string;
}

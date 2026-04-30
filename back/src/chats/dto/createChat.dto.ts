import {
  IsString,
  IsArray,
  ValidateIf,
  ArrayMinSize,
  IsNotEmpty,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ChatVisibility, ChatType } from '../types/chat.type';

export class CreateChatDto {
  @ApiProperty({
    example: ['uuid-user-1', 'uuid-user-2'],
    description: 'Minimum 2 member user IDs',
  })
  @IsArray()
  @IsString({ each: true })
  @ArrayMinSize(2)
  members: string[];

  @ApiPropertyOptional({
    example: 'Dev Team',
    description: 'Group name — required when creating a group with 3+ members',
  })
  @ValidateIf((o: CreateChatDto) => o.members && o.members.length > 2)
  @IsString()
  @IsNotEmpty()
  username?: string;

  @ApiProperty({ enum: ['private', 'group'], example: 'group' })
  @IsString({ message: 'should be set to "private" or "group"' })
  @IsNotEmpty({ message: 'required' })
  type: ChatType;

  @ApiPropertyOptional({
    enum: ['private', 'public'],
    example: 'public',
    description: 'Required when creating a group',
  })
  @ValidateIf(
    (o: CreateChatDto) =>
      o.type && o.type === 'group' && o.members && o.members.length >= 2,
  )
  @IsString({
    message:
      'should be a private or public. Required when creating a group with 2+ members',
  })
  visibility?: ChatVisibility;
}

export type CreateChatDtoWithOwner = CreateChatDto & { ownerId: string };

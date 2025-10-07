import {
  IsString,
  IsArray,
  ValidateIf,
  ArrayMinSize,
  IsNotEmpty,
} from 'class-validator';
import { ChatVisibility, ChatType } from '../types/chat.type';

export class CreateChatDto {
  @IsArray()
  @IsString({ each: true })
  @ArrayMinSize(2)
  members: string[];

  @ValidateIf((o: CreateChatDto) => o.members && o.members.length > 2)
  @IsString()
  @IsNotEmpty()
  name?: string;

  @IsString({ message: 'should be set to "private" or "group"' })
  @IsNotEmpty({ message: 'required' })
  type: ChatType;

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

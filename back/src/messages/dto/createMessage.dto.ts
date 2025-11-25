import { IsUUID, IsString } from 'class-validator';
import { Files } from '../../attachments/types/attachments.type';

export class CreateMessageDto {
  @IsUUID()
  chatId: string;

  @IsUUID()
  authorId: string;

  @IsString()
  text: string;

  files: Partial<Files>;
}

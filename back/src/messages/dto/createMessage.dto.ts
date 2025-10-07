import { IsUUID, IsString } from 'class-validator';

export class CreateMessageDto {
  @IsUUID()
  chatId: string;

  @IsUUID()
  authorId: string;

  @IsString()
  text: string;
}

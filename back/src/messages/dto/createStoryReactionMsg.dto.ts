import { IsString, IsNotEmpty, MaxLength, IsUUID } from 'class-validator';

export class CreateStoryReactionMsgDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  text: string;

  @IsUUID()
  @IsNotEmpty()
  receiverId: string;
}

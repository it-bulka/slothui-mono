import { IsUUID, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { CreatePollDto } from '../../polls/dto/createPoll.dto';
import { CreateGeoMessageDto } from '../../geo-message/dto/createGeoMessage.dto';

export class CreateMessageBaseDto {
  @ApiProperty({ example: 'uuid-chat-1234' })
  @IsUUID()
  chatId: string;

  @ApiProperty({ example: 'uuid-user-1234' })
  @IsUUID()
  authorId: string;

  @ApiProperty({ example: 'Hello!' })
  @IsString()
  text: string;
}

export class CreateMessageDtoWithFiles extends CreateMessageBaseDto {
  @ApiPropertyOptional({
    type: 'array',
    items: { type: 'string', format: 'binary' },
    description: 'Up to 25 files',
  })
  files: Express.Multer.File[];
}

export class CreateMessageDtoWithStory extends CreateMessageBaseDto {
  @ApiProperty({ example: 'uuid-story-1234' })
  storyId: string;
}

export class CreateMessageDtoWithEvent extends CreateMessageBaseDto {
  @ApiProperty({ example: 'uuid-event-1234' })
  eventId: string;
}

export class CreateMessageDtoWithPoll extends CreateMessageBaseDto {
  @ApiProperty({ type: () => CreatePollDto })
  poll: CreatePollDto;
}

export class CreateMessageDtoWithGeo extends CreateMessageBaseDto {
  @ApiProperty({ type: () => CreateGeoMessageDto })
  geo: CreateGeoMessageDto;
}

export class CreateMessageDtoWithPost extends CreateMessageBaseDto {
  @ApiProperty({ example: 'uuid-post-1234' })
  postId: string;
}

export type CreateMessageDto =
  | CreateMessageBaseDto
  | CreateMessageDtoWithFiles
  | CreateMessageDtoWithStory
  | CreateMessageDtoWithEvent
  | CreateMessageDtoWithPoll
  | CreateMessageDtoWithGeo
  | CreateMessageDtoWithPost;

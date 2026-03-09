import { IsUUID, IsString } from 'class-validator';
import { Files } from '../../attachments/types/attachments.type';
import { CreatePollDto } from '../../polls/dto/createPoll.dto';
import { CreateGeoMessageDto } from '../../geo-message/dto/createGeoMessage.dto';

export class CreateMessageBaseDto {
  @IsUUID()
  chatId: string;

  @IsUUID()
  authorId: string;

  @IsString()
  text: string;
}

export class CreateMessageDtoWithFiles extends CreateMessageBaseDto {
  files: Partial<Files>;
}

export class CreateMessageDtoWithStory extends CreateMessageBaseDto {
  storyId: string;
}

export class CreateMessageDtoWithEvent extends CreateMessageBaseDto {
  eventId: string;
}

export class CreateMessageDtoWithPoll extends CreateMessageBaseDto {
  poll: CreatePollDto;
}

export class CreateMessageDtoWithGeo extends CreateMessageBaseDto {
  geo: CreateGeoMessageDto;
}

export type CreateMessageDto =
  | CreateMessageBaseDto
  | CreateMessageDtoWithFiles
  | CreateMessageDtoWithStory
  | CreateMessageDtoWithEvent
  | CreateMessageDtoWithPoll
  | CreateMessageDtoWithGeo;

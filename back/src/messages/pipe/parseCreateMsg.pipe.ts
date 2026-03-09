import { Injectable } from '@nestjs/common';
import { PipeTransform } from '@nestjs/common';
import { CreatePollDto } from '../../polls/dto/createPoll.dto';
import { CreateGeoMessageDto } from '../../geo-message/dto/createGeoMessage.dto';
import { parseAndValidate } from '../helpers/parseAndValidate';

@Injectable()
export class ParseCreateMsgPipe implements PipeTransform {
  transform(
    value: Record<string, any> & {
      poll?: CreatePollDto | string;
      geo?: CreateGeoMessageDto | string;
    },
  ) {
    const { poll, geo } = value;

    return {
      ...value,
      poll: poll ? parseAndValidate(poll, CreatePollDto, 'poll') : undefined,
      geo: geo ? parseAndValidate(geo, CreateGeoMessageDto, 'geo') : undefined,
    };
  }
}

import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { validateSync } from 'class-validator';
import { CreatePollDto } from '../../polls/dto/createPoll.dto';

@Injectable()
export class ParseCreateMsgPollPipe implements PipeTransform {
  transform(value: Record<string, any> & { poll?: CreatePollDto | string }) {
    let poll = value.poll;
    if (!poll) return value;

    if (typeof poll === 'string') {
      try {
        poll = JSON.parse(poll) as CreatePollDto;
      } catch {
        throw new BadRequestException('Invalid poll JSON string');
      }
    }

    const object = plainToInstance(CreatePollDto, poll);
    const errors = validateSync(object, { whitelist: true });

    if (errors.length > 0) {
      throw new BadRequestException(errors);
    }

    return { ...value, poll: object };
  }
}

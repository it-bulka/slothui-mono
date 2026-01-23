import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { validateSync } from 'class-validator';
import { CreatePollDto } from '../../polls/dto/createPoll.dto';
import { CreatePostWithPoll } from '../dto/createPost.dto';

@Injectable()
export class ParseCreatePostPollPipe implements PipeTransform {
  transform(value: Partial<CreatePostWithPoll>): Partial<CreatePostWithPoll> {
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

    return { text: value.text, poll: object };
  }
}

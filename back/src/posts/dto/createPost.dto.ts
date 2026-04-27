import { CreatePollDto } from '../../polls/dto/createPoll.dto';

export interface CreatePostBase {
  text?: string;
}

export interface CreatePostWithFiles extends CreatePostBase {
  files: Express.Multer.File[];
}

export interface CreatePostWithPoll extends CreatePostBase {
  poll: CreatePollDto;
}

export type CreatePostDto =
  | CreatePostBase
  | CreatePostWithFiles
  | CreatePostWithPoll;

export type CreatePostCommand =
  | {
      type: 'text';
      text: string;
      authorId: string;
    }
  | {
      type: 'files';
      text?: string;
      files: Express.Multer.File[];
      authorId: string;
    }
  | {
      type: 'poll';
      text?: string;
      poll: CreatePollDto;
      authorId: string;
    };

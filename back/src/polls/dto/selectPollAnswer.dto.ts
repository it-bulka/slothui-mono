import { IsArray, IsString } from 'class-validator';

export class SelectPollAnswerDto {
  @IsArray()
  @IsString({ each: true })
  answerIds: string[];
}

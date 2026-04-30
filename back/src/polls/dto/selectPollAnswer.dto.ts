import { IsArray, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SelectPollAnswerDto {
  @ApiProperty({
    example: ['uuid-answer-1'],
    description: 'One or more answer IDs to vote for',
  })
  @IsArray()
  @IsString({ each: true })
  answerIds: string[];
}

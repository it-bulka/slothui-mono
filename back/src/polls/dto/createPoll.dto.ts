import {
  IsString,
  IsArray,
  IsBoolean,
  ValidateNested,
  ArrayMinSize,
} from 'class-validator';
import { Type } from 'class-transformer';

export class PollAnswerDto {
  @IsString()
  value: string;
}

export class CreatePollDto {
  @IsString()
  question: string;

  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => PollAnswerDto)
  answers: PollAnswerDto[];

  @IsBoolean()
  multiple: boolean;

  @IsBoolean()
  anonymous: boolean;
}

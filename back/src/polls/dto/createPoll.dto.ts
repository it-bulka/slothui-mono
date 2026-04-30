import {
  IsString,
  IsArray,
  IsBoolean,
  ValidateNested,
  ArrayMinSize,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class PollAnswerDto {
  @ApiProperty({ example: 'Option A' })
  @IsString()
  value: string;
}

export class CreatePollDto {
  @ApiProperty({ example: 'What is your favourite framework?' })
  @IsString()
  question: string;

  @ApiProperty({
    type: [PollAnswerDto],
    description: 'At least 1 answer option',
  })
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => PollAnswerDto)
  answers: PollAnswerDto[];

  @ApiProperty({
    example: false,
    description: 'Allow multiple answer selections',
  })
  @IsBoolean()
  multiple: boolean;

  @ApiProperty({ example: false, description: 'Hide voter identities' })
  @IsBoolean()
  anonymous: boolean;
}

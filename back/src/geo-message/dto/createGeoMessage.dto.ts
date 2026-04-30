import {
  IsString,
  IsArray,
  IsNumber,
  ArrayMinSize,
  ArrayMaxSize,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateGeoMessageDto {
  @ApiProperty({
    example: [50.4501, 30.5234],
    description: '[latitude, longitude]',
    minItems: 2,
    maxItems: 2,
    type: [Number],
  })
  @IsArray()
  @ArrayMinSize(2)
  @ArrayMaxSize(2)
  @IsNumber({}, { each: true })
  position: [number, number];

  @ApiProperty({ example: 'Kyiv, Independence Square' })
  @IsString()
  locationName: string;
}

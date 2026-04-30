import { IsArray, IsString } from 'class-validator';
import { AtLeastOneArrayNotEmpty } from '../decorators/atLeastOneArrayNotEmpty';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateMembersDto {
  @ApiProperty({
    example: ['uuid-user-3'],
    description: 'User IDs to add to the chat',
  })
  @IsArray()
  @IsString({ each: true })
  add: string[];

  @ApiProperty({
    example: ['uuid-user-2'],
    description: 'User IDs to remove from the chat',
  })
  @IsArray()
  @IsString({ each: true })
  remove: string[];

  @AtLeastOneArrayNotEmpty(['add', 'remove'], {
    message: "Either 'add' or 'remove' must contain at least one item",
  })
  _atLeastOne!: boolean;
}

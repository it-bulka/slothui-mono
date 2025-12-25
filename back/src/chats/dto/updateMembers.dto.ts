import { IsArray, IsString } from 'class-validator';
import { AtLeastOneArrayNotEmpty } from '../decorators/atLeastOneArrayNotEmpty';

export class UpdateMembersDto {
  @IsArray()
  @IsString({ each: true })
  add: string[];

  @IsArray()
  @IsString({ each: true })
  remove: string[];

  @AtLeastOneArrayNotEmpty(['add', 'remove'], {
    message: "Either 'add' or 'remove' must contain at least one item",
  })
  _atLeastOne!: boolean;
}

import { IsString, IsNotEmpty, MaxLength, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateStoryReactionMsgDto {
  @ApiProperty({ example: '😍', maxLength: 255 })
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  text: string;

  @ApiProperty({
    example: 'uuid-receiver-1234',
    description: 'Story author user ID',
  })
  @IsUUID()
  @IsNotEmpty()
  receiverId: string;

  @ApiProperty({ example: 'uuid-story-1234' })
  @IsUUID()
  @IsNotEmpty()
  storyId: string;
}

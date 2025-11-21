import { Controller } from '@nestjs/common';
import { StoriesService } from './stories.service';

@Controller('stories')
export class StoriesController {
  constructor(private readonly storiesService: StoriesService) {}

  /*@Post('/:storyId/messages')
  async sendStoryMessage(@Param('storyId') storyId: string, @Body() body: { text: string }, @User() sender: User) {
    const story = await storyService.findById(storyId);

    let chat = await chatService.findStoryChat(story.id, sender.id, story.ownerId);
    if (!chat) {
      chat = await chatService.createStoryChat(story.id, sender.id, story.ownerId);
    }

    return messageService.create({
      chatId: chat.id,
      senderId: sender.id,
      text: body.text,
    });
  }*/
}

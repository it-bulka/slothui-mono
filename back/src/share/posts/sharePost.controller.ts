import { Controller, Get, Param, Render } from '@nestjs/common';
import { SharePostService } from './sharePost.service';

@Controller('share/posts')
export class SharePostController {
  constructor(private readonly shareService: SharePostService) {}

  @Get(':id')
  @Render('posts/post')
  async sharePost(@Param('id') id: string) {
    const data = await this.shareService.getPostData(id);
    return { data };
  }
}

import { Controller, Get, Param, Render } from '@nestjs/common';
import { SharePostService } from './sharePost.service';

@Controller('share/posts')
export class SharePostController {
  constructor(private readonly shareService: SharePostService) {}

  @Get(':id')
  @Render('posts/post')
  sharePost(@Param('id') id: string) {
    const data = this.shareService.getPostData(id);
    console.log('SHARE post:', data);
    return { data };
  }
}

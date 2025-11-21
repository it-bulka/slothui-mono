import { Module } from '@nestjs/common';
import { SharePostService } from './posts/sharePost.service';
import { SharePostController } from './posts/sharePost.controller';

@Module({
  controllers: [SharePostController],
  providers: [SharePostService],
})
export class ShareModule {}

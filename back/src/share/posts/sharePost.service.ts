import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class SharePostService {
  constructor(private readonly config: ConfigService) {}
  getPostData(id: string) {
    const frontOrigin: string = this.config.getOrThrow('FRONT_ORIGIN');
    console.log('frontOrigin', frontOrigin);
    return {
      title: `Post ${id} — Amazing Content`,
      description: `This is a post with id ${id}.`,
      image: 'https://www.imgonline.com.ua/examples/bee-on-daisy.jpg',
      url: frontOrigin,
    };
  }
}

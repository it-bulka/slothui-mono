import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from '../../posts/entities/post.entity';
import { Attachment } from '../../attachments/entities/attachment.entity';

@Injectable()
export class SharePostService {
  constructor(
    private readonly config: ConfigService,
    @InjectRepository(Post)
    private readonly postsRepo: Repository<Post>,
    @InjectRepository(Attachment)
    private readonly attachmentsRepo: Repository<Attachment>,
  ) {}

  async getPostData(id: string) {
    const frontOrigin: string = this.config.getOrThrow('FRONT_ORIGIN');
    const postUrl = `${frontOrigin}/posts/${id}`;

    const [post, firstImage] = await Promise.all([
      this.postsRepo.findOne({ where: { id }, relations: ['author'] }),
      this.attachmentsRepo.findOne({
        where: { parentId: id, parentType: 'post', type: 'images' },
        order: { order: 'ASC' },
      }),
    ]);

    if (!post) {
      return {
        title: 'SlothUI',
        description: 'Check out this post on SlothUI',
        image: `${frontOrigin}/og-default.png`,
        url: postUrl,
      };
    }

    const image =
      firstImage?.url ??
      post.author?.avatarUrl ??
      `${frontOrigin}/og-default.png`;
    const authorName = post.author?.username ?? 'SlothUI';
    const text = post.text ?? '';

    return {
      title:
        text.length > 0
          ? `${authorName}: ${text.slice(0, 100)}`
          : `${authorName}'s post`,
      description: text.slice(0, 200) || 'Check out this post on SlothUI',
      image,
      url: postUrl,
    };
  }
}

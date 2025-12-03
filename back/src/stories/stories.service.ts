import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
  ForbiddenException,
} from '@nestjs/common';
import { Story } from './entities/story.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { Express } from 'express';
import { ConfigService } from '@nestjs/config';
import { checkNextCursor } from '../common/utils/checkNextCursor';
import { User } from '../user/entities/user.entity';
import { UserWithStory, UsersWithStoryPaginatedRes } from './dto/story.dto';
import { StoryView } from './entities/storyView.entitty';
import { ViewDto, ViewsPaginatedResponse } from './dto/view.dto';

@Injectable()
export class StoriesService {
  constructor(
    @InjectRepository(Story)
    private readonly storyRepo: Repository<Story>,
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
    @InjectRepository(StoryView)
    private readonly viewsRepo: Repository<StoryView>,
    private readonly cloudinaryService: CloudinaryService,
    private readonly configService: ConfigService,
  ) {}

  async findById(id: string) {
    return await this.storyRepo.findOne({ where: { id } });
  }

  async create(file: Express.Multer.File, userId: string) {
    const PROJECT_FOLDER: string =
      this.configService.getOrThrow('CLOUDINARY_PROJECT');
    const uploaded = await this.cloudinaryService.uploadFileStream(
      file,
      `${PROJECT_FOLDER}/stories`,
    );

    const now = new Date();
    const expiresAt = new Date(now.getTime() + 24 * 60 * 60 * 1000);

    const ext = file.mimetype.split('/')[0] as 'image' | 'video';
    const story = this.storyRepo.create({
      user: { id: userId },
      url: uploaded.url,
      publicId: uploaded.public_id,
      type: ext,
      expiresAt,
    });

    return await this.storyRepo.save(story);
  }

  async deleteStory(id: string, autorId: string) {
    const story = await this.storyRepo.findOne({ where: { id } });
    if (!story) {
      throw new NotFoundException(`Story with id ${id} not found`);
    }

    if (story.userId !== autorId) {
      throw new ForbiddenException('You are not allowed to delete this story');
    }
    try {
      await this.cloudinaryService.deleteFile(id);
      await this.storyRepo.remove(story);
    } catch {
      throw new InternalServerErrorException(
        'Failed to delete the file. Please try again later.',
      );
    }
  }

  async getUsersWithStory(
    authorsIds: string[],
    currentUserId: string,
    options: {
      limit?: number;
      cursor?: string | null;
    },
  ): Promise<UsersWithStoryPaginatedRes> {
    const { limit = 50, cursor } = options;
    const qb = this.userRepo
      .createQueryBuilder('user')
      .innerJoin('user.stories', 'story', 'story.expiresAt > NOW()')
      .leftJoin('story.views', 'view', 'view.viewer = :currentUserId', {
        currentUserId,
      })
      .select(['user.id', 'user.name', 'user.nickname', 'user.avatarUrl'])
      .addSelect('MAX(story.createdAt)', 'lastStoryDate')
      .addSelect('COUNT(story.id)', 'totalStories')
      .addSelect('COUNT(view.id)', 'viewedStories')
      .where('user.id IN (:...authorsIds)', { authorsIds })
      .groupBy('user.id')
      .orderBy('MAX(story.createdAt)', 'DESC')
      .limit(limit + 1);

    if (cursor) {
      const [lastStoryDate, userId] = cursor.split('_');
      qb.andWhere(
        '(MAX(story.createdAt), user.id) < (:lastStoryDate, :userId)',
        {
          lastStoryDate,
          userId,
        },
      );
    }

    const { entities, raw } = await qb.getRawAndEntities<{
      lastStoryDate: string;
      totalStories: string;
      viewedStories: string;
    }>();
    const users: UserWithStory[] = entities.map((user, index) => {
      const addition = raw[index];
      return {
        ...user,
        lastStoryDate: addition.lastStoryDate,
        totalStories: Number(addition.totalStories),
        viewedStories: Number(addition.viewedStories),
        hasUnseen:
          Number(addition.viewedStories) < Number(addition.totalStories),
      };
    });

    const { resultItems, hasMore, itemForCursor } = checkNextCursor({
      items: users,
      cursorField: 'id',
      limit,
    });

    const nextCursor =
      itemForCursor?.lastStoryDate && itemForCursor?.id
        ? `${itemForCursor.lastStoryDate}_${itemForCursor.id}`
        : null;

    return {
      items: resultItems,
      nextCursor,
      hasMore,
    };
  }

  async getStoriesByUser(userId: string) {
    return this.storyRepo.find({
      where: { userId },
      order: { createdAt: 'ASC' },
    });
  }

  async getStoryViews(
    storyId: string,
    authorId: string,
    options: { cursor?: string | null; limit?: number },
  ): Promise<ViewsPaginatedResponse> {
    const story = await this.storyRepo.findOne({
      where: { id: storyId },
    });
    if (!story) {
      throw new NotFoundException(`Story with id ${storyId} not found`);
    }

    if (story.userId !== authorId) {
      throw new ForbiddenException(
        `You are not the author of story. Not allowed to get views`,
      );
    }

    const limit = options?.limit || 50;
    const cursor = options?.cursor;
    const qb = this.viewsRepo
      .createQueryBuilder('view')
      .innerJoin('view.viewer', 'user')
      .where('view.storyId = :storyId', { storyId: story.id })
      .select([
        'view.id',
        'view.viewedAt',
        'user.id',
        'user.name',
        'user.nickname',
        'user.avatarUrl',
      ])
      .orderBy('view.viewedAt', 'ASC')
      .limit(limit + 1);

    if (cursor) {
      qb.andWhere('user.id > :lastUserId', { lastUserId: cursor });
    }

    const views: ViewDto[] = await qb.getMany();
    const { itemForCursor, resultItems, hasMore } = checkNextCursor({
      items: views,
      limit,
    });

    return {
      items: resultItems,
      nextCursor: itemForCursor?.viewer?.id || null,
      hasMore,
    };
  }

  async setStoryView(storyId: string, viewerId: string) {
    const story = await this.storyRepo.findOne({ where: { id: storyId } });
    if (!story) {
      throw new NotFoundException(`Story not found`);
    }

    return await this.viewsRepo
      .createQueryBuilder()
      .insert()
      .into(StoryView)
      .values({
        storyId,
        viewerId,
      })
      .orIgnore()
      .execute();
  }
}

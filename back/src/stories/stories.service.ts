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
import { UserWithStory } from './dto/story.dto';
import { StoryView } from './entities/storyView.entitty';
import { ViewDto, ViewsPaginatedResponse } from './dto/view.dto';
import { RedisService } from '../redis/redis.service';
import { CACHE_KEYS } from '../redis/redis.cache-keys';

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
    private readonly cache: RedisService,
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

    const saved = await this.storyRepo.save(story);
    await this.cache.del(CACHE_KEYS.stories(userId));
    return saved;
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
      await this.cache.del(CACHE_KEYS.stories(story.userId));
    } catch {
      throw new InternalServerErrorException(
        'Failed to delete the file. Please try again later.',
      );
    }
  }

  async getUsersWithStory(
    authorsIds: string[] | undefined,
    currentUserId: string,
    options: {
      limit?: number;
      cursor?: string | null;
    },
  ) {
    const { limit = 50, cursor } = options;
    const qb = this.userRepo
      .createQueryBuilder('user')
      .innerJoin('user.stories', 'story', 'story.expiresAt > NOW()')
      .leftJoin('story.views', 'view', 'view.viewer = :currentUserId', {
        currentUserId,
      })
      .select(['user.id', 'user.username', 'user.nickname', 'user.avatarUrl'])
      .addSelect('MAX(story.createdAt)', 'lastStoryDate')
      .addSelect('COUNT(story.id)', 'totalStories')
      .addSelect('COUNT(view.id)', 'viewedStories')
      .groupBy('user.id')
      .orderBy('MAX(story.createdAt)', 'DESC')
      .limit(limit + 1)
      .andWhere('user.id != :currentUserId');

    if (authorsIds?.length) {
      qb.andWhere('user.id IN (:...authorsIds)', { authorsIds });
    }

    if (cursor) {
      const [lastStoryDate, userId] = cursor.split('_');
      qb.andWhere(
        '(MAX(story.createdAt), user.id) < (:lastStoryDate, :userId)',
        { lastStoryDate, userId },
      );
    }

    const { entities, raw } = await qb.getRawAndEntities<{
      lastStoryDate: string;
      totalStories: string;
      viewedStories: string;
    }>();

    const usersWithMeta: UserWithStory[] = entities.map((user, index) => {
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
      items: usersWithMeta,
      cursorField: 'id',
      limit,
    });

    const nextCursor =
      itemForCursor?.lastStoryDate && itemForCursor?.id
        ? `${itemForCursor.lastStoryDate}_${itemForCursor.id}`
        : null;

    // Batch-fetch story content using Redis-cached getStoriesByUser
    const storiesPerUser = await Promise.all(
      resultItems.map((u) => this.getStoriesByUser(u.id)),
    );

    const items = resultItems.map((user, i) => ({
      userId: user.id,
      username: user.nickname || user.username,
      avatar: user.avatarUrl ?? '',
      storiesAmount: storiesPerUser[i].length,
      stories: storiesPerUser[i].map((s) => ({
        id: s.id,
        url: s.url,
        type: s.type,
        duration: s.duration ?? null,
        isViewed: false,
        createdAt: s.createdAt,
        expiresAt: s.expiresAt ?? null,
        userId: s.userId,
      })),
    }));

    return { items, nextCursor, hasMore };
  }

  async getStoriesByUser(userId: string): Promise<Story[]> {
    const key = CACHE_KEYS.stories(userId);
    const cached = await this.cache.get<Story[]>(key);
    if (cached) return cached;

    const stories = await this.storyRepo.find({
      where: { userId },
      order: { createdAt: 'ASC' },
    });
    await this.cache.set(key, stories, 120);
    return stories;
  }

  async getFormattedStoriesByUser(userId: string) {
    const [user, stories] = await Promise.all([
      this.userRepo.findOneOrFail({ where: { id: userId } }),
      this.getStoriesByUser(userId),
    ]);
    return {
      userId: user.id,
      username: user.nickname || user.username,
      avatar: user.avatarUrl ?? '',
      storiesAmount: stories.length,
      stories: stories.map((s) => ({
        id: s.id,
        url: s.url,
        type: s.type,
        duration: s.duration ?? null,
        isViewed: false,
        createdAt: s.createdAt,
        expiresAt: s.expiresAt ?? null,
        userId: s.userId,
      })),
    };
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
        'user.username',
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

  async setBatchStoryViews(
    storyIds: string[],
    viewerId: string,
  ): Promise<void> {
    await Promise.all(storyIds.map((id) => this.setStoryView(id, viewerId)));
  }

  async setStoryView(storyId: string, viewerId: string) {
    const story = await this.storyRepo.findOne({ where: { id: storyId } });
    if (!story) {
      throw new NotFoundException(`Story not found`);
    }

    const result = await this.viewsRepo
      .createQueryBuilder()
      .insert()
      .into(StoryView)
      .values({
        storyId,
        viewerId,
      })
      .orIgnore()
      .execute();

    await this.cache.del(CACHE_KEYS.stories(story.userId));
    return result;
  }
}

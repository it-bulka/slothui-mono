import {
  Injectable,
  ConflictException,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/user.dto';
import { AuthJwtUser } from '../auth/types/jwt.types';
import { In, type FindOptionsWhere } from 'typeorm';
import { UserShortDTO } from './dto/user-response.dto';
import { PaginatedResponse } from '../common/types/pagination.type';
import { FollowerService } from '../follower/follower.service';
import { PostsService } from '../posts/posts.service';
import {
  UserProfileDto,
  UserProfileDtoWithRelations,
} from './dto/user-profile.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
    private readonly followerService: FollowerService,
    private readonly postsService: PostsService,
  ) {}

  async create(
    createUserDto: Omit<CreateUserDto, 'password'> & {
      avatarUrl?: string;
      password: string | null;
    },
  ) {
    const { email, nickname } = createUserDto;
    if (!email || !nickname)
      throw new BadRequestException('Email or nickname is missing');
    const existingUser = await this.userRepo.findOne({
      where: [{ email }, { nickname }],
    });

    if (existingUser) throw new ConflictException(`User already exists`);

    const user = this.userRepo.create(createUserDto);
    return await this.userRepo.save(user);
  }

  async createWithProviderId(
    createUserDto: Pick<CreateUserDto, 'nickname' | 'name'> & {
      avatarUrl?: string;
      providerId: string;
      providerName: 'instagram' | 'twitter' | 'github' | 'telegram';
      email?: string;
    },
  ) {
    const { providerName, providerId, nickname, avatarUrl, name, email } =
      createUserDto;

    if (!providerId) throw new BadRequestException('ProviderId is required');

    const existingUser = await this.userRepo.findOne({
      where: { [`${providerName}Id`]: providerId },
    });

    if (existingUser) throw new ConflictException(`User already exists`);

    const user = this.userRepo.create({
      [`${providerName}Id`]: providerId,
      avatarUrl,
      nickname,
      name,
      email,
    });
    return await this.userRepo.save(user);
  }

  async findByEmail(email: string): Promise<User | null> {
    return await this.userRepo.findOne({
      where: { email },
    });
  }

  async findByInstagramId(id: string): Promise<User | null> {
    return await this.userRepo.findOne({
      where: { instagramId: id },
    });
  }

  async findByGithub(id: string, email?: string): Promise<User | null> {
    const query: FindOptionsWhere<User>[] = [{ githubId: id }];
    if (email) {
      query.push({ email });
    }
    return await this.userRepo.findOne({
      where: query,
    });
  }

  async findByTelegramId(id: string): Promise<User | null> {
    return await this.userRepo.findOne({
      where: { telegramId: id },
    });
  }

  async findOne(
    id: string,
    options: { throwErrorIfNotExist: true },
  ): Promise<User>;
  async findOne(
    id: string,
    options?: { throwErrorIfNotExist?: false },
  ): Promise<User | null>;
  async findOne(id: string, options: { throwErrorIfNotExist?: boolean } = {}) {
    const user = await this.userRepo.findOne({ where: { id } });
    if (options.throwErrorIfNotExist && !user)
      throw new BadRequestException(`User with ID ${id} does not exist`);
    return user;
  }

  async updateRefreshToken(user: AuthJwtUser, token: string): Promise<void> {
    const result = await this.userRepo.update(
      { id: user.id },
      { hashedRefreshToken: token },
    );
    if (result.affected === 0) {
      throw new NotFoundException('User not found');
    }
  }

  async deleteRefreshToken(userId: string): Promise<void> {
    const result = await this.userRepo.update(
      { id: userId },
      { hashedRefreshToken: null },
    );
    if (result.affected === 0) {
      throw new NotFoundException('User not found');
    }
  }

  async findByIds(
    ids: string[],
    options: { throwErrorIfNotExist: true; returnInvalidIds?: boolean },
  ): Promise<User[]> | never;
  async findByIds(
    ids: string[],
    options?: { throwErrorIfNotExist?: false },
  ): Promise<User[]>;
  async findByIds(
    ids: string[],
    options: {
      throwErrorIfNotExist?: boolean;
      returnInvalidIds?: boolean;
    } = {},
  ) {
    const users = await this.userRepo.find({
      where: { id: In(ids) },
    });

    let notFoundIds: string[] = [];
    if (options.returnInvalidIds) {
      const foundIds = users.map((u) => u.id);
      notFoundIds = ids.filter((id) => !foundIds.includes(id));
    }

    if (options.throwErrorIfNotExist && ids.length !== users.length) {
      const msg = 'Some user IDs do not exist';
      if (!options.returnInvalidIds) throw new BadRequestException(msg);

      throw new BadRequestException({
        message: msg,
        invalidIds: notFoundIds,
      });
    }

    return users;
  }

  async getUserShort(id: string): Promise<UserShortDTO | null> {
    return await this.userRepo.findOne({
      where: { id },
      select: ['id', 'nickname', 'avatarUrl'],
    });
  }

  async getUsersShort(ids: string[]): Promise<UserShortDTO[]> {
    return await this.userRepo.find({
      where: { id: In(ids) },
      select: ['id', 'nickname', 'avatarUrl'],
    });
  }

  async search(q: {
    cursor?: string | null;
    limit?: number;
    search: string;
  }): Promise<PaginatedResponse<UserShortDTO>> {
    const limit = q.limit || 50;
    const trimmedSearch = q.search?.trim().replace(/^@/, '');
    if (!trimmedSearch)
      return {
        items: [],
        nextCursor: null,
        hasMore: false,
      };

    const qb = this.userRepo
      .createQueryBuilder('u')
      .where('u.nickname ILIKE :search', { search: `%${trimmedSearch}%` })
      .select([
        'u.id AS id',
        'u.name AS username',
        'u.nickname AS nickname',
        'u.avatarUrl AS avatarUrl',
      ])
      .orderBy('u.id', 'ASC')
      .take(limit + 1);

    if (q.cursor) {
      qb.andWhere('u.id > :cursor', { cursor: q.cursor });
    }

    const users = await qb.getRawMany<UserShortDTO>();
    const hasMore = users.length > limit;
    const items = hasMore ? users.slice(0, limit) : users;
    const nextCursor = hasMore ? users[users.length - 1].id : null;

    return {
      items,
      hasMore,
      nextCursor,
    };
  }

  async getProfileData(userId: string): Promise<UserProfileDto> {
    const user = await this.findOne(userId, { throwErrorIfNotExist: true });
    const [followersCount, followeesCount, postsCount] = await Promise.all([
      this.followerService.countFollowers(userId),
      this.followerService.countFollowees(userId),
      this.postsService.countPosts(userId),
    ]);

    return {
      user: {
        id: user.id,
        nickname: user.nickname,
        username: user.name,
        avatarUrl: user.avatarUrl,
        description: user.description,
      },
      stats: {
        followersCount,
        followeesCount,
        postsCount,
      },
    };
  }

  async getProfileDataForOtherUser(
    userId: string,
    currentUserId: string,
  ): Promise<UserProfileDtoWithRelations> {
    const profile = await this.getProfileData(userId);

    const { isFollower, isFollowee } =
      await this.followerService.getFollowingsRelations({
        userId,
        currentUserId,
      });

    return {
      ...profile,
      relation: { isFollower, isFollowee },
    };
  }
}

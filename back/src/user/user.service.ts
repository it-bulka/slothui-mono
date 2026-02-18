import {
  Injectable,
  ConflictException,
  BadRequestException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/user.dto';
import { AuthJwtUser } from '../auth/types/jwt.types';
import { In } from 'typeorm';
import { UserShortDTO } from './dto/user-response.dto';
import { PaginatedResponse } from '../common/types/pagination.type';
import { FollowerService } from '../follower/follower.service';
import { PostsService } from '../posts/posts.service';
import {
  UserProfileDto,
  UserProfileDtoWithRelations,
} from './dto/user-profile.dto';
import { ProfileUpdateDto } from './dto/profile-update.dto';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { ConfigService } from '@nestjs/config';
import { UserAccount } from './entities/userAccount.entity';
import { AuthProvider } from './types/authProviders.type';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
    @InjectRepository(UserAccount)
    private readonly userAccountRepo: Repository<UserAccount>,
    private readonly followerService: FollowerService,
    private readonly postsService: PostsService,
    private readonly cloudinaryService: CloudinaryService,
    private readonly configService: ConfigService,
  ) {}

  async createLocalProvider(
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
    await this.userRepo.save(user);

    const account = this.userAccountRepo.create({
      user: { id: user.id },
      provider: AuthProvider.LOCAL,
      providerId: user.id,
    });
    await this.userAccountRepo.save(account);

    return user;
  }

  async updateProfileData(
    userId: string,
    dto: ProfileUpdateDto & { avatar?: Express.Multer.File },
  ) {
    const keys = Object.keys(dto);
    if (!keys.length) {
      throw new BadRequestException('No data to update');
    }

    if (!userId) throw new BadRequestException(`NO userId`);
    const user = await this.userRepo.findOneBy({ id: userId });
    if (!user) throw new BadRequestException(`User not found`);

    const { avatar: _a, removeAvatar, ...dtoData } = dto;
    const newData: Partial<User> = dtoData;

    if (dto.avatar) {
      const uploaded = await this.updateAvatar(dto.avatar, user.avatarPublicId);
      newData.avatarPublicId = uploaded?.public_id;
      newData.avatarUrl = uploaded?.url;
    }

    if (removeAvatar) {
      await this.deleteAvatar(user.avatarPublicId);
      newData.avatarPublicId = undefined;
      newData.avatarUrl = undefined;
    }

    Object.assign(user, newData);
    return await this.userRepo.save(user);
  }

  async updateAvatar(
    newAvatarFile: Express.Multer.File,
    prevAvatarPublicId?: string,
  ) {
    const PROJECT_FOLDER: string =
      this.configService.getOrThrow('CLOUDINARY_PROJECT');

    const PATH = `${PROJECT_FOLDER}/avatar`;
    let uploaded: Awaited<
      ReturnType<typeof this.cloudinaryService.uploadFileBase64>
    >;
    try {
      uploaded = await this.cloudinaryService.uploadFileStream(
        newAvatarFile,
        PATH,
      );
    } catch (err) {
      console.warn('Stream upload failed, fallback to base64', err);

      const base64 = `data:${newAvatarFile.mimetype};base64,${newAvatarFile.buffer.toString('base64')}`;
      uploaded = await this.cloudinaryService.uploadFileBase64(base64, PATH);
    }

    if (prevAvatarPublicId) {
      await this.cloudinaryService.deleteFile(prevAvatarPublicId);
    }

    return uploaded;
  }

  async deleteAvatar(prevAvatarPublicId?: string) {
    if (!prevAvatarPublicId) return null;
    return await this.cloudinaryService.deleteFile(prevAvatarPublicId);
  }

  async findOrCreateOAuthUser(dto: {
    provider: AuthProvider;
    providerId: string;
    email?: string;
    username: string;
    nickname: string;
    avatarUrl?: string;
  }) {
    const account = await this.userAccountRepo.findOne({
      where: { provider: dto.provider, providerId: dto.providerId },
      relations: ['user'],
    });

    if (account) return account.user;

    let user: User | null = null;

    if (dto.email) {
      user = await this.userRepo.findOne({ where: { email: dto.email } });
    }

    if (!user) {
      user = this.userRepo.create({
        username: dto.username,
        nickname: dto.nickname,
        email: dto.email,
        avatarUrl: dto.avatarUrl,
      });
      await this.userRepo.save(user);
    }

    const newAccount = this.userAccountRepo.create({
      user: { id: user.id },
      provider: dto.provider,
      providerId: dto.providerId,
    });

    await this.userAccountRepo.save(newAccount);
    return user;
  }

  async findByEmail(email: string): Promise<User | null> {
    return await this.userRepo.findOne({
      where: { email },
    });
  }

  async findByProvider(
    provider: AuthProvider,
    providerId: string,
  ): Promise<User | null> {
    const account = await this.userAccountRepo.findOne({
      where: { provider, providerId },
      relations: ['user'],
    });

    return account?.user || null;
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
    const user = await this.userRepo.findOne({
      where: { id: userId },
      select: ['id', 'nickname', 'username', 'email', 'avatarUrl', 'bio'],
    });

    if (!user) throw new BadRequestException(`User not found`);

    const [followersCount, followeesCount, postsCount] = await Promise.all([
      this.followerService.countFollowers(userId),
      this.followerService.countFollowees(userId),
      this.postsService.countPosts(userId),
    ]);

    return {
      user: {
        id: user.id,
        nickname: user.nickname,
        username: user.username,
        avatarUrl: user.avatarUrl,
        bio: user.bio,
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

  async getProviders(userId: string) {
    return await this.userAccountRepo.find({
      where: { user: { id: userId } },
      select: ['provider', 'providerId'],
    });
  }

  async changePassword(
    userId: string,
    oldPassword: string,
    newPassword: string,
  ) {
    const user = await this.validatePassword(userId, oldPassword);

    user.password = newPassword;
    await this.userRepo.save(user);
  }

  async updatePassword(userId: string, newPassword: string) {
    const user = await this.findOne(userId);
    if (!user) throw new NotFoundException('User not found');

    user.password = newPassword;
    await this.userRepo.save(user);
  }

  async validatePassword(userId: string, password: string) {
    const user = await this.userRepo.findOne({ where: { id: userId } });
    if (!user) throw new UnauthorizedException(`User not found`);
    if (!user.password) throw new UnauthorizedException(`Invalid credentials`);

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch)
      throw new UnauthorizedException('Invalid credentials');
    return user;
  }
}

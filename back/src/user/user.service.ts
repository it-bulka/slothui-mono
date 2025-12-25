import {
  Injectable,
  ConflictException,
  BadRequestException,
} from '@nestjs/common';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/user.dto';
import { AuthJwtUser } from '../auth/types/jwt.types';
import { In, type FindOptionsWhere } from 'typeorm';
import { UserShortDTO } from './dto/user-response.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  async create(
    createUserDto: Omit<CreateUserDto, 'password'> & {
      avatarUrl?: string;
      password: string | null;
    },
  ) {
    const { email, nickname } = createUserDto;
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
  async findOne(id: string, { throwErrorIfNotExist }) {
    const user = await this.userRepo.findOne({ where: { id } });
    if (throwErrorIfNotExist && !user)
      throw new BadRequestException(`User with ID ${id} does not exist`);
    return user;
  }

  async updateRefreshToken(user: AuthJwtUser, token: string): Promise<void> {
    await this.userRepo.update({ id: user.id }, { hashedRefreshToken: token });
  }

  async deleteRefreshToken(userId: string): Promise<void> {
    await this.userRepo.update({ id: userId }, { hashedRefreshToken: null });
  }

  async findByIds(
    ids: string[],
    options: { throwErrorIfNotExist: true; returnInvalidIds?: boolean },
  ): Promise<User[]> | never;
  async findByIds(
    ids: string[],
    options?: { throwErrorIfNotExist?: false },
  ): Promise<User[]>;
  async findByIds(ids: string[], { throwErrorIfNotExist, returnInvalidIds }) {
    const users = await this.userRepo.find({
      where: { id: In(ids) },
    });

    let notFoundIds: string[] = [];
    if (returnInvalidIds) {
      const foundIds = users.map((u) => u.id);
      notFoundIds = ids.filter((id) => !foundIds.includes(id));
    }

    if (throwErrorIfNotExist && ids.length !== users.length) {
      const msg = 'Some user IDs do not exist';
      if (!returnInvalidIds) throw new BadRequestException(msg);

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
}

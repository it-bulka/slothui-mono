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
import { In } from 'typeorm';

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

  async findByEmail(email: string): Promise<User | null> {
    return await this.userRepo.findOne({
      where: { email },
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
}

import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user/entities/user.entity';
import { Repository } from 'typeorm';
import { RolesEnum } from './common/types/roles.types';

@Injectable()
export class AppService implements OnModuleInit {
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>,
  ) {}

  async onModuleInit() {
    const adminExists = await this.userRepo.findOne({
      where: { email: process.env.ADMIN_EMAIL },
    });

    if (!adminExists) {
      const admin = this.userRepo.create({
        email: process.env.ADMIN_EMAIL,
        password: process.env.ADMIN_PASSWORD,
        username: process.env.ADMIN_NAME,
        nickname: process.env.ADMIN_NICKNAME,
        role: RolesEnum.ADMIN,
      });
      await this.userRepo.save(admin);
    }
  }
}

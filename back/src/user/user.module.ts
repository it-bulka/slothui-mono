import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { FollowerModule } from '../follower/follower.module';
import { PostsModule } from '../posts/posts.module';
import { CloudinaryModule } from '../cloudinary/cloudinary.module';
import { UserAccount } from './entities/userAccount.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, UserAccount]),
    FollowerModule,
    PostsModule,
    CloudinaryModule,
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}

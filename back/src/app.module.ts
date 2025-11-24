import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AdminModule } from './admin/admin.module';
import { AppService } from './app.service';
import { User } from './user/entities/user.entity';
import { WsModule } from './ws/ws.module';
import { MessagesModule } from './messages/messages.module';
import { ChatsModule } from './chats/chats.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { FollowersSnapshotModule } from './followers-snapshot/followers-snapshot.module';
import { FollowerModule } from './follower/follower.module';
import { StatsModule } from './stats/stats.module';
import { StoriesModule } from './stories/stories.module';
import * as path from 'node:path';
import { ConfigService } from '@nestjs/config';
import { MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { StaticGuardMiddleware } from './common/guards/static/static.guard';
import { ShareModule } from './share/share.module';
import { PostsModule } from './posts/posts.module';
import { AttachmentsModule } from './attachments/attachments.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: path.join(__dirname, 'public', 'docs'),
      serveRoot: '/docs',
    }),
    ServeStaticModule.forRoot({
      rootPath: path.join(__dirname, 'public', 'social'),
      serveRoot: '/public/social',
    }),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      useFactory: () => {
        return {
          type: 'postgres',
          host: 'localhost',
          port: 5432,
          username: process.env.POSTGRES_USER,
          password: process.env.POSTGRES_PASSWORD,
          database: process.env.POSTGRES_DB,
          autoLoadEntities: true,
          synchronize: true,
        };
      },
    }),
    AuthModule,
    UserModule,
    AdminModule,
    TypeOrmModule.forFeature([User]),
    WsModule,
    MessagesModule,
    ChatsModule,
    FollowersSnapshotModule,
    FollowerModule,
    StatsModule,
    StoriesModule,
    ShareModule,
    PostsModule,
    AttachmentsModule,
  ],
  controllers: [],
  providers: [AppService],
})
export class AppModule {
  constructor(private readonly configService: ConfigService) {}

  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(StaticGuardMiddleware)
      .forRoutes({ path: '/public/social/*', method: RequestMethod.ALL });
  }
}

import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  BeforeInsert,
  OneToMany,
  ManyToMany,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { RolesEnum } from '../../common/types/roles.types';
import { Message } from '../../messages/entities/message.entity';
import { Chat } from '../../chats/entities/chat.entity';
import { FollowersSnapshotEntity } from '../../followers-snapshot/entities/followers-snapshot.entity';
import { Follower } from '../../follower/entity/follower.entity';
import { Story } from '../../stories/entities/story.entity';
import { StoryView } from '../../stories/entities/storyView.entitty';
import { Post } from '../../posts/entities/post.entity';
import { PostLike } from '../../posts/entities/postLike.entity';
import { PostSave } from '../../posts/entities/postSave.entity';
import { Event } from '../../events/entity/event.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', nullable: true }) // if OAuth
  password: string | null;

  @Column({ type: 'varchar' })
  username: string;

  @Column({ type: 'varchar', unique: true })
  nickname: string;

  @Column({ type: 'varchar', nullable: true })
  bio: string | null;

  @Column({ type: 'varchar', unique: true, nullable: true })
  email?: string;

  @Column({ type: 'varchar', unique: true, nullable: true })
  instagramId?: string;

  @Column({ type: 'varchar', unique: true, nullable: true })
  twitterId?: string;

  @Column({ type: 'varchar', unique: true, nullable: true })
  githubId?: string;

  @Column({ type: 'varchar', unique: true, nullable: true })
  telegramId?: string;

  @Column({ type: 'enum', enum: RolesEnum, default: RolesEnum.USER })
  role: RolesEnum;

  @Column({ nullable: true, default: undefined })
  avatarUrl?: string;

  @Column({ nullable: true, default: undefined })
  avatarPublicId?: string;

  @CreateDateColumn()
  createdAt: Date;

  @Column({ type: 'text', nullable: true })
  hashedRefreshToken: string | null;

  @OneToMany(() => Message, (message) => message.author)
  messages: Message[];

  @ManyToMany(() => Chat, (chat) => chat.members)
  chats: Chat[];

  @OneToMany(() => Chat, (chat) => chat.owner)
  ownedChats: Chat[];

  @OneToMany(() => FollowersSnapshotEntity, (snapshot) => snapshot.user)
  followersSnapshots!: FollowersSnapshotEntity[];

  @OneToMany(() => Follower, (f) => f.follower)
  followers: Follower[];

  @OneToMany(() => Follower, (f) => f.followee)
  followees: Follower[];

  @OneToMany(() => Story, (story) => story.user)
  stories: Story[];

  @OneToMany(() => StoryView, (view) => view.viewer)
  viewedStories: StoryView[];

  // POST
  @OneToMany(() => Post, (post) => post.author)
  posts: Post[];

  @OneToMany(() => PostLike, (like) => like.id)
  postLikes: PostLike[];

  @OneToMany(() => PostSave, (save) => save.id)
  postSaves: PostSave[];

  @OneToMany(() => Event, (event) => event.organizer)
  organizedEvents: Event[];

  @ManyToMany(() => Event, (event) => event.participants)
  participatingEvents: Event[];

  @BeforeInsert()
  async hashPassword() {
    if (this.password) {
      this.password = await bcrypt.hash(this.password, 10);
    }
  }
}

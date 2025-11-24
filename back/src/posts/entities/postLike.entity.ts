import { Entity, PrimaryGeneratedColumn, OneToOne, ManyToOne } from 'typeorm';
import { Post } from './post.entity';
import { User } from '../../user/entities/user.entity';

@Entity()
export class PostLike {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (user) => user.id)
  user: User;

  @OneToOne(() => Post, (post) => post.id)
  post: Post;
}

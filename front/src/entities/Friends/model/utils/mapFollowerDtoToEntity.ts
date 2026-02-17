import type { FriendDto } from '@/shared/types';
import type { FriendEntity } from '../type/friends.type.ts';

export const mapFollowerDtoToEntity = (dto: FriendDto): FriendEntity => ({
  id: dto.id,
  src: dto.src,
  username: dto.username,
  nickname: dto.nickname,

  isFollowee: dto.isFollowee,
  isFollower: dto.isFollower,

  followedAt: Date.parse(dto.createdAt),
});

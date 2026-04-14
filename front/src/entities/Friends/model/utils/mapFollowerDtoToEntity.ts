import type { FriendDto } from '@/shared/types';
import type { FriendEntity } from '../type/friends.type.ts';

export const mapFollowerDtoToEntity = (dto: FriendDto): FriendEntity => ({
  id: dto.id,
  src: dto.src,
  username: dto.username,
  nickname: dto.nickname,

  isFollowee: dto.isFollowee ?? false,
  isFollower: dto.isFollower ?? false,

  followedAt: dto.createdAt ? Date.parse(dto.createdAt) : 0,
});

import type { FriendDto } from '@/shared/types';
import type { FriendEntity } from '../type/friends.type.ts';

export const mapFollowerDtoToEntity = (dto: FriendDto): FriendEntity => ({
  id: dto.id,
  src: dto.src,
  name: dto.name,
  nickname: dto.nickname,

  isFollowing: dto.isFollowing,
  isFollower: dto.isFollower,

  followedAt: Date.parse(dto.createdAt),
});

import { StoryAvatar } from '@/entities';
import MockAvatar from '@/mock/images/avatar.png';
import { BlockTitle } from '../../BlockTitle/BlockTitle.tsx';

export const Stories = () => (
  <section>
    <BlockTitle title="Story Highlights" withMargin />
    <StoryAvatar
      avatarSrc={MockAvatar}
      username="username"
    />
  </section>
);

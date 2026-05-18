import { memo } from 'react';
import { Typography } from '@/shared/ui/Typography/Typography'
import { Tab } from '@/shared/ui/Tab/Tab';
import { TypographyTypes } from '@/shared/ui/Typography/typography.types';
import { Feed } from '@/widgets/Feed';
import { useTypeTab } from '@/shared/hooks';
import { LikedPostsContent } from './LikedPostsContent.tsx';
import { LikedEventsContent } from './LikedEventsContent.tsx';

const TABS = ['posts', 'events'];

const LikedPage = memo(() => {
  const { activeIndex, onTabChange } = useTypeTab(TABS);

  return (
    <Feed header={(
      <Typography
        variant="h1"
        type={TypographyTypes.BLOCK_TITLE}
        bold
        className="toolbar sticky top-0 z-10"
      >
        Liked
      </Typography>
    )}>
      <Tab
        scrollableTabs
        scrollableContent
        animated
        tabs={['Posts', 'Events']}
        activeTabIndex={activeIndex}
        onTabChange={onTabChange}
        contents={[
          <LikedPostsContent />,
          <LikedEventsContent />,
        ]}
        contentClassName="space-y-4 px-main py-main"
      />
    </Feed>
  );
});

LikedPage.displayName = 'LikedPage';

export default LikedPage;

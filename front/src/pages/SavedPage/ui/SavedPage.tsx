import { memo } from 'react';
import { Typography } from '@/shared/ui/Typography/Typography'
import { Tab } from '@/shared/ui/Tab/Tab';
import { TypographyTypes } from '@/shared/ui/Typography/typography.types';
import { Feed } from '@/widgets/Feed';
import { useTypeTab } from '@/shared/hooks';
import { SavedPostsContent } from './SavedPostsContent.tsx';
import { SavedEventsContent } from './SavedEventsContent.tsx';

const TABS = ['posts', 'events'];

const SavedPage = memo(() => {
  const { activeIndex, onTabChange } = useTypeTab(TABS);

  return (
    <Feed header={(
      <Typography
        variant="h1"
        type={TypographyTypes.BLOCK_TITLE}
        bold
        className="toolbar sticky top-0 z-10"
      >
        Saved
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
          <SavedPostsContent />,
          <SavedEventsContent />,
        ]}
        contentClassName="space-y-4 px-main py-main"
      />
    </Feed>
  );
});

SavedPage.displayName = 'SavedPage';

export default SavedPage;

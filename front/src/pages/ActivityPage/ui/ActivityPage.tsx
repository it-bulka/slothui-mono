import { memo } from 'react';
import { Typography, AppLink } from '@/shared/ui';
import { TypographyTypes } from '@/shared/ui/Typography/typography.types';
import { getLikedPage, getSavedPage } from '@/shared/config/routeConfig/routeConfig.tsx';

const ActivityPage = memo(() => {
  return (
    <main className="relative flex flex-col min-h-full">
      <Typography
        variant="h1"
        type={TypographyTypes.BLOCK_TITLE}
        bold
        className="toolbar sticky top-0 z-10"
      >
        Activity
      </Typography>

      <section className="px-main py-main flex flex-col gap-4">
        <nav aria-label="Activity sections">
          <ul className="flex flex-col gap-3">
            <li>
              <AppLink to={getLikedPage()}>Liked</AppLink>
            </li>
            <li>
              <AppLink to={getSavedPage()}>Saved</AppLink>
            </li>
          </ul>
        </nav>
      </section>
    </main>
  );
});

ActivityPage.displayName = 'ActivityPage';

export default ActivityPage;

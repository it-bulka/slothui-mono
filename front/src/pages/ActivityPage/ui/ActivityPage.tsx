import { memo } from 'react';
import { Typography } from '@/shared/ui/Typography/Typography'
import { NavCardLink } from '@/shared/ui/NavCardLink';
import { getLikedPage, getSavedPage } from '@/shared/config/routeConfig/routeConfig.tsx';

const links = [
  { title: 'Liked', description: 'Posts and events you liked', to: getLikedPage() },
  { title: 'Saved', description: 'Posts and events you saved', to: getSavedPage() },
]

const ActivityPage = memo(() => {
  return (
    <main className="relative flex flex-col min-h-full">
      <Typography
        variant="h1"
        bold
        className="toolbar header-glass sticky top-0 z-10"
      >
        Activity
      </Typography>

      <section className="px-main py-main bg-underground-secondary flex flex-col gap-4 grow">
        {links.map((link) => (
          <NavCardLink key={link.to} {...link} />
        ))}
      </section>
    </main>
  );
});

ActivityPage.displayName = 'ActivityPage';

export default ActivityPage;

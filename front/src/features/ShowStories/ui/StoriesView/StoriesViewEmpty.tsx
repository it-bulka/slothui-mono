import { Typography } from '@/shared/ui/Typography/Typography';
import { TypographyTypes } from '@/shared/ui/Typography/typography.types.ts';

export const StoriesViewEmpty = () => {
  return (
    <div
      className="flex flex-col items-center justify-center h-full w-full gap-5 bg-stories-empty"
    >
      <div className="w-24 h-24 rounded-full border border-gray-g1/50 flex items-center justify-center">
        <svg
          width="36"
          height="36"
          viewBox="0 0 36 36"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          className="text-gray-g1"
        >
          <line x1="18" y1="3" x2="18" y2="9" />
          <line x1="18" y1="27" x2="18" y2="33" />
          <line x1="3" y1="18" x2="9" y2="18" />
          <line x1="27" y1="18" x2="33" y2="18" />
          <line x1="18" y1="13" x2="18" y2="23" />
          <line x1="13" y1="18" x2="23" y2="18" />
        </svg>
      </div>

      <div className="flex flex-col items-center gap-1 text-center">
        <Typography variant="h3" type={TypographyTypes.BLOCK_TITLE} bold className="text-white">
          No active stories
        </Typography>
        <Typography variant="p" type={TypographyTypes.P} color="secondary">
          Check back later
        </Typography>
      </div>
    </div>
  );
};

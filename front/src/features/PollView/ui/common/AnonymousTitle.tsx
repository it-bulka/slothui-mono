import { Typography } from '@/shared/ui/Typography/Typography';
import { memo } from 'react';
import { TypographyTypes } from '@/shared/ui/Typography/typography.types';

export const AnonymousTitle = memo(() => {
  return <Typography type={TypographyTypes.P_SM} color="secondary">Anonymous Poll</Typography>
})

AnonymousTitle.displayName = 'AnonymousTitle'
import { Typography } from '@/shared/ui';
import { memo } from 'react';
import { TypographyTypes } from '@/shared/ui';

export const AnonymousTitle = memo(() => {
  return <Typography type={TypographyTypes.P_SM} color="secondary">Anonymous Poll</Typography>
})

AnonymousTitle.displayName = 'AnonymousTitle'
import { Typography } from '../../Typography/Typography.tsx';
import { memo } from 'react';

export const Error = memo(({text}: { text: string}) => {
  return <Typography color="error">{text}</Typography>
})

Error.displayName = 'Error'
import { type PropsWithChildren, memo } from 'react';
import { Typography, AppLink } from '@/shared/ui';
import { RoutePaths } from '@/shared/config/routeConfig/routeConfig.tsx';

interface SubSettingsWrapperProps {
  title: string
}
export const SubSettingsWrapper = memo(({ title, children }: PropsWithChildren<SubSettingsWrapperProps>) => {
  return (
    <div className="min-h-full bg-underground-secondary">
      <Typography className="toolbar" bold>
        <span>{title}</span>
        <AppLink to={RoutePaths.settings}>Back to Settings</AppLink>
      </Typography>

      <div className="px-main py-main flex flex-col gap-4">
        { children }
      </div>
    </div>
  )
})

SubSettingsWrapper.displayName = 'SubSettingsWrapper'
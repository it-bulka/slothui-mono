import { AppLink } from '@/shared/ui';
import { ThemeSelect } from '@/widgets';
import { RoutePaths } from '@/shared/config/routeConfig/routeConfig.tsx';

const links = [
  { title: 'Profile settings', href: RoutePaths.settings_profile },
  { title: 'Account settings', href: RoutePaths.settings_account },
  { title: 'Privacy settings', href: RoutePaths.settings_privacy }
]
const Settings = () => {
  return (
    <div className="px-main py-main bg-underground-secondary min-h-full flex flex-col gap-3">
      <ThemeSelect />
      {links.map(({ title, href}) => (
        <AppLink to={href} className={"justify-between"}>
          {title}
        </AppLink>
      ))}
    </div>
  )
}

export default Settings
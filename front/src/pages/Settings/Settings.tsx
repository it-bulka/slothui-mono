import { NavCardLink } from '@/shared/ui/NavCardLink';
import { ThemeSelect } from '@/widgets/ThemeSelect';
import { RoutePaths } from '@/shared/config/routeConfig/routeConfig.tsx';
import { Helmet } from 'react-helmet-async';

const links = [
  { title: 'Profile settings', description: 'Edit your profile information', to: RoutePaths.settings_profile },
  { title: 'Account settings', description: 'Manage your account', to: RoutePaths.settings_account },
  { title: 'Privacy settings', description: 'Control your privacy', to: RoutePaths.settings_privacy },
]

const Settings = () => {
  return (
    <>
      <Helmet><title>Settings — SlothUI</title></Helmet>
      <div className="px-main py-main bg-underground-secondary min-h-full flex flex-col gap-4">
        <ThemeSelect />
        {links.map((link) => (
          <NavCardLink key={link.to} {...link} />
        ))}
      </div>
    </>
  )
}

export default Settings
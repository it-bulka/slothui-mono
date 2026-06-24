import { Link } from 'react-router';
import { ThemeSelect } from '@/widgets/ThemeSelect';
import { RoutePaths } from '@/shared/config/routeConfig/routeConfig.tsx';
import { Helmet } from 'react-helmet-async';

const links = [
  { title: 'Profile settings', description: 'Edit your profile information', href: RoutePaths.settings_profile },
  { title: 'Account settings', description: 'Manage your account', href: RoutePaths.settings_account },
  { title: 'Privacy settings', description: 'Control your privacy', href: RoutePaths.settings_privacy },
]

const Settings = () => {
  return (
    <>
      <Helmet><title>Settings — SlothUI</title></Helmet>
      <div className="px-main py-main bg-underground-secondary min-h-full flex flex-col gap-4">
        <ThemeSelect />
        {links.map(({ title, description, href }) => (
          <Link key={href} to={href} className="settings-card group">
            <div className="flex-1">
              <p className="font-bold text-dark">{title}</p>
              <p className="text-sm text-gray-g1 mt-1">{description}</p>
            </div>
            <svg className="w-5 h-5 text-gray-g2 group-hover:text-blue-b1 transition-colors shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        ))}
      </div>
    </>
  )
}

export default Settings
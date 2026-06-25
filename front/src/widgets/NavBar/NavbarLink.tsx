import { NavLink } from 'react-router';
import { Badge } from '@/shared/ui/Badge/Badge';
import * as React from 'react';

interface NavLinkProps {
  title: string;
  href: string;
  Icon: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  count?: number;
  end?: boolean;
  collapsed?: boolean;
}

export const NavbarLink = ({ title, href, Icon, count, end, collapsed }: NavLinkProps) => {
  return (
    <li className="pb-2">
      <NavLink
        to={href}
        end={end}
        aria-label={collapsed ? title : undefined}
        className={({ isActive }) =>
          `nav-link${isActive ? ' nav-link-active' : ''}${collapsed ? ' nav-link-collapsed' : ''}`
        }
      >
        {({ isActive }) => (
          <span className="relative flex items-center w-full">
            <Icon aria-hidden="true" className={`w-6 h-6 shrink-0 ${isActive ? 'text-blue-b1' : 'text-gray-g2'}`} />
            {!collapsed && <p className="grow font-bold ml-2">{title}</p>}
            {!collapsed && !!count && <Badge>{count}</Badge>}
            {collapsed && !!count && (
              <Badge className="absolute -top-2 -right-2 text-[10px] min-w-[16px] h-4 flex items-center justify-center px-1">
                {count}
              </Badge>
            )}
          </span>
        )}
      </NavLink>
    </li>
  );
};

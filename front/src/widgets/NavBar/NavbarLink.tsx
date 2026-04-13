import { NavLink } from 'react-router';
import { Badge } from '@/shared/ui';
import * as React from 'react';

interface NavLinkProps {
  title: string;
  href: string;
  Icon: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  count?: number;
  end?: boolean;
}
export const NavbarLink = ({title, href, Icon, count, end }: NavLinkProps) => {
  return (
    <li className="pb-2">
      <NavLink
        to={href}
        end={end}
        className={({ isActive }) => `nav-link${isActive ? ' nav-link-active' : ''}`}
      >
        {({ isActive }) => (
          <>
            <Icon className={`w-[24px] h-[24px] shrink-0 ${isActive ? 'text-blue-b1' : 'text-gray-g2'}`} />
            <p className='grow font-bold'>{title}</p>
            {!count || <Badge>{count}</Badge>}
          </>
        )}
      </NavLink>
    </li>
  )
}

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
        className={({ isActive }) =>
          `flex items-center p-3 w-full rounded-xl transition-colors ${
            isActive
              ? 'bg-blue-b4 text-blue-b1'
              : 'hover:bg-light-l1'
          }`
        }
      >
        {({ isActive }) => (
          <>
            <Icon className={`w-[24px] h-[24px] pr-2 shrink-0 ${isActive ? 'text-blue-b1' : 'text-gray-g2'}`} />
            <p className='grow font-bold'>{title}</p>
            {!count || <Badge>{count}</Badge>}
          </>
        )}
      </NavLink>
    </li>
  )
}

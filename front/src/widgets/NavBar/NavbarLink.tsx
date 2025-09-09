import { NavLink } from 'react-router';
import { Badge } from '@/shared/ui';
import * as React from 'react';

interface NavLinkProps {
  title: string;
  href: string;
  //Icon: (props: SVGProps<SVGSVGElement>) => JSX.Element;
  Icon: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  count?: number;
}
export const NavbarLink = ({title, href, Icon, count }: NavLinkProps) => {
  return (
    <li className="pb-2">
      <NavLink to={href} className={'flex items-center p-3 w-full'}>
        <Icon className={'w-[24px] h-[24px] text-gray-g2 pr-2'}/>
        <p className={'grow font-bold'}>{title}</p>
        {!count || <Badge>{count}</Badge>}
      </NavLink>
    </li>
  )
}
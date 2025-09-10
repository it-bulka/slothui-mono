import  { type PropsWithChildren } from 'react';
import * as React from 'react';
import { memo } from 'react';
import { twMerge } from 'tailwind-merge';
import classnames from 'classnames';

interface ListProps {
  topBorder?: boolean;
  className?: string;
}
export const List = memo(({ children, topBorder = true, className }:PropsWithChildren<ListProps>) => {
  return (
    <ul className={twMerge(topBorder ? "border-style-t" : "", className)}>
      {children}
    </ul>
  )
}) as React.MemoExoticComponent<({ children }: PropsWithChildren<ListProps>) => React.ReactElement> & {
  Item: typeof ListItem;
};

type ListItemProps = {
  btnIcon: React.FunctionComponent<React.SVGProps<SVGSVGElement>>
  iconClassName?: string
} | { btnText: string };

const ListItem = memo((props: PropsWithChildren<ListItemProps>) => {
  const Icon = ('btnIcon' in props) && props.btnIcon
  const text = ('btnText' in props) ? props.btnText : ''
  return (
    <li className="flex justify-between items-center py-[0.9375rem] border-style-b gap-3">
      {props.children}
      <button className={classnames("text-gray-g2 text-l", { ["w-[20px]"]: !!Icon})}>
        {Icon ? <Icon className={twMerge("w-5 h-5", props.iconClassName)} /> : text}
      </button>
    </li>
  )
})

List.Item = ListItem;
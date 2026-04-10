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
  className?: string;
  onClick?: () => void;
  /** Makes the entire row a single clickable button. Icon becomes decorative. */
  onRowClick?: () => void;
} & (
  | { btnIcon: React.FunctionComponent<React.SVGProps<SVGSVGElement>>; iconClassName?: string }
  | { btnText: string }
);

const ROW_CLS = "flex justify-between items-center py-[0.9375rem] gap-3";
const ICON_BTN_CLS = "text-gray-g2 text-l w-[20px] shrink-0";

const ListItem = memo((props: PropsWithChildren<ListItemProps>) => {
  const Icon = ('btnIcon' in props) ? props.btnIcon : null;
  const iconClassName = ('btnIcon' in props) ? props.iconClassName : undefined;
  const text = ('btnText' in props) ? props.btnText : '';

  const iconContent = Icon
    ? <Icon className={twMerge("w-5 h-5", iconClassName)} />
    : text;

  if (props.onRowClick) {
    return (
      <li className={twMerge("border-style-b", props.className)}>
        <button
          onClick={props.onRowClick}
          className={twMerge(ROW_CLS, "w-full text-left")}
        >
          {props.children}
          <span className={ICON_BTN_CLS} aria-hidden="true">{iconContent}</span>
        </button>
      </li>
    );
  }

  return (
    <li className={twMerge(classnames(ROW_CLS, "border-style-b"), props.className)}>
      {props.children}
      <button className={ICON_BTN_CLS} onClick={props.onClick}>
        {iconContent}
      </button>
    </li>
  );
})

List.Item = ListItem;
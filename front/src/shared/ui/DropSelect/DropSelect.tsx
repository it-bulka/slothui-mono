import { memo, type ReactNode } from 'react';
import Select, { type Props } from 'react-select';

type BaseOption = {
  value: string;
  label: ReactNode;
};

type DropSelectProps<T extends BaseOption> = Props<T, false>;

function DropSelectInner<T extends BaseOption>(
  { options, defaultValue, ...rest }: DropSelectProps<T>
) {
  return (
    <Select
      options={options}
      defaultValue={defaultValue}
      {...rest}
      classNamePrefix="rs"
    />
  );
}

DropSelectInner.displayName = 'DropSelect';
export const DropSelect = memo(DropSelectInner) as typeof DropSelectInner;


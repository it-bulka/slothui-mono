import { memo, type ReactNode } from 'react';
import Select, { type Props } from 'react-select'

type OptionType = {
  value: string;
  label: ReactNode;
};

type DropSelectProps = Props<OptionType, false>;

export const DropSelect = memo(({options, defaultValue, ...rest }: DropSelectProps) => {
  return (
    <Select
      options={options}
      defaultValue={defaultValue}
      {...rest}
      classNamePrefix="rs"
    />
  )
})

DropSelect.displayName = 'DropSelect'
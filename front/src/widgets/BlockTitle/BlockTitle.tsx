import type { ReactNode } from 'react';
import { Typography, TypographyTypes } from '@/shared/ui';
import MoreSvg from '@/shared/assets/images/general/more.svg?react'

type BlockTitleProps = {
  title: string
  withMargin?: boolean
} &
  ( { onBtnClick?: () => void }
  | { customBtn: ReactNode }
  | { withoutBtn: boolean })

export const BlockTitle = (props: BlockTitleProps) => {
  return (
    <div className={`flex justify-between items-start ${props.withMargin ? 'mb-6' : ''}`}>
      <Typography type={TypographyTypes.BLOCK_TITLE} variant="h3">
        {props.title}
      </Typography>

      {'customBtn' in props && props.customBtn}

      {!('withoutBtn' in props) && !('customBtn' in props) && (
        <button onClick={('onBtnClick'in props) ? props.onBtnClick : undefined} className="text-svg-primary">
          <MoreSvg /> {/*TODO: add action*/}
        </button>
      )}
    </div>
  )
}
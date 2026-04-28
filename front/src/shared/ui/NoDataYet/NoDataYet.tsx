import { Button } from '../Button/Button.tsx'
import { Typography } from '../Typography/Typography.tsx'

interface NoDataYetProps {
  image: string
  title: string
  subtitle: string
  buttonLabel?: string
  onButtonClick?: () => void
}

export const NoDataYet = ({ image, title, subtitle, buttonLabel, onButtonClick }: NoDataYetProps) => {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-10 text-center">
      <img src={image} alt="" className="w-40 h-40 object-contain" />
      <Typography bold>{title}</Typography>
      <Typography className="text-gray-g2">{subtitle}</Typography>
      {buttonLabel && (
        <Button variant="outlined" onClick={onButtonClick} className="mt-2">
          {buttonLabel}
        </Button>
      )}
    </div>
  )
}

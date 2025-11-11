import { memo, useRef, type ReactNode, type ChangeEvent } from 'react';
import { ActionButton, type ActionButtonProps } from '@/shared/ui';

interface UploadButtonProps extends ActionButtonProps {
  accept: string
  onFilesSelect: (files: File[]) => void
  children: ReactNode
  multiple?: boolean
}

export const UploadButton = memo(({
  multiple = false, accept, onFilesSelect, children, ...rest
}: UploadButtonProps) => {
  const inputRef = useRef<HTMLInputElement>(null)

  const handleClick = () => inputRef.current?.click()

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files) onFilesSelect(Array.from(files))
  }

  return (
    <>
      <ActionButton {...rest} onClick={handleClick}>{children}</ActionButton>
      <input
        ref={inputRef}
        type="file"
        style={{ display: 'none' }}
        accept={accept}
        onChange={handleChange}
        multiple={multiple}
      />
    </>
  )
})

UploadButton.displayName = 'UploadButton'
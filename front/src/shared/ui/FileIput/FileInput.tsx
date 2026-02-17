import { useState, useEffect, type FormEvent, type HTMLAttributes } from 'react'
import { Button, Typography } from '@/shared/ui';

interface FileInputProps extends Omit<HTMLAttributes<HTMLInputElement>, 'onChange'> {
  onChange?: (files: FileList | null) => void
  label?: string
  accept?: string
  maxFiles?: number
  maxFileSizeMB?: number
  defaultPreview?: string
  title?: string
  name: string
  error?: string
  value?: unknown
}

const Previews = ({
  previews,
  onItemClick,
  withDelete = false
}: {
  previews: string[],
  onItemClick?: (idx: number) => void
  withDelete?: boolean
}) => {
  return (
    <div className="flex gap-2 mt-2">
      {previews.map((url, idx) => (
        <div key={idx} className="w-20 h-20 rounded border overflow-hidden relative">
          {withDelete && (
            <button
              onClick={() => { onItemClick?.(idx)}}
              className={"absolute top-0 right-0 py-0.5 px-1 bg-black/50 text-white text-bold rounded-xs hover:bg-black/70"}
              type="button"
            >
              x
            </button>
          )}

          <img src={url} alt="preview" loading="lazy" className={"object-cover block w-full h-full"}/>
        </div>
      ))}
    </div>
  )
}

export function FileInput({
  label,
  onChange,
  accept,
  maxFiles,
  maxFileSizeMB,
  defaultPreview,
  title,
  name,
  error,
  ...props
}: FileInputProps) {
  const [fileNames, setFileNames] = useState<string>('')
  const [previews, setPreviews] = useState<string[]>(defaultPreview ? [defaultPreview] : [])
  const [errors, setErrors] = useState<string[]>([])
  const [files, setFiles] = useState<File[]>([])

  const { value: _val, ...inputProps } = props

  const handleChange = (e: FormEvent<HTMLInputElement>) => {
    const files = (e.target as HTMLInputElement).files
    if (!files || !files.length) return

    let selectedFiles = Array.from(files)
    const newErrors: string[] = []

    if (maxFiles && selectedFiles.length > maxFiles) {
      newErrors.push(`Acceptable amount of file: ${maxFiles}`)
      selectedFiles = selectedFiles.slice(0, maxFiles)
    }

    if (maxFileSizeMB) {
      selectedFiles = selectedFiles.filter(file => {
        const sizeMB = file.size / (1024 * 1024)
        if (sizeMB > maxFileSizeMB) {
          newErrors.push(`File "${file.name}" exceeds ${maxFileSizeMB} MB`)
          return false
        }
        return true
      })
    }

    setErrors(newErrors)
    setFiles(selectedFiles)
    setFileNames(selectedFiles.map(f => f.name).join(', '))

    const urls = selectedFiles
      .filter(f => f.type.startsWith('image/'))
      .map(f => URL.createObjectURL(f))

    previews.forEach(url => URL.revokeObjectURL(url))
    setPreviews(urls)

    const dataTransfer = new DataTransfer()
    selectedFiles.forEach(f => dataTransfer.items.add(f))
    onChange?.(dataTransfer.files)
  }

  const handleRemove = (index: number) => {
    console.log('handleRemove', index)
    const newFiles = files.filter((_, i) => i !== index)

    const dt = new DataTransfer()
    newFiles.forEach(f => dt.items.add(f))
    setFiles(newFiles)

    let newPreviews = newFiles.map(url => URL.createObjectURL(url))
    if(!newPreviews.length && defaultPreview) {
      newPreviews = [defaultPreview]
    } else {
      newPreviews = []
    }

    previews.forEach(url => URL.revokeObjectURL(url))
    setPreviews(newPreviews)
    console.log('handleRemove', { newPreviews, newFiles: newFiles.length })

    onChange?.(dt.files)
  }

  useEffect(() => {
    return () => {
      previews.forEach(url => URL.revokeObjectURL(url))
    }
  }, [previews])

  return (
    <div className="flex flex-col gap-2">
      {label && <label className="text-sm font-medium">{label}</label>}

      {previews.length === 1 && <Previews previews={previews} onItemClick={handleRemove} withDelete={!!files.length} />}

      <div className="relative w-full flex flex-col gap-2">
        <input
          type="file"
          onChange={handleChange}
          accept={accept}
          multiple
          {...inputProps}
          name={name}
          className="absolute w-full h-full opacity-0 cursor-pointer z-10 inset-0"
        />

        <Button
          type="button"
          className="block w-full! z-0 grow"
        >
          {title || 'Upload file'}
        </Button>

        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-200">
          {previews.length ? `Chosen ${previews.length} files` : 'File not chosen'}
        </span>
      </div>
      {error && <Typography color='error'>{error}</Typography>}
      {previews.length > 0 && <p className="text-gray-200 truncate w-full">{fileNames}</p>}

      {errors.length > 0 && (
        <ul className="text-red-500 text-sm mt-1 list-disc list-inside">
          {errors.map((err, idx) => (
            <li key={idx}>{err}</li>
          ))}
        </ul>
      )}

      {previews.length > 1 && <Previews previews={previews} onItemClick={handleRemove} withDelete={!!files.length}/>}
    </div>
  )
}
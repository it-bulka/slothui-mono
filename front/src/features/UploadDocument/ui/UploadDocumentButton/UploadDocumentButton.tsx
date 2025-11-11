import { UploadButton } from '@/shared/ui';
import DocumentSvg from '@/shared/assets/images/actions/document.svg?react'
import { memo } from 'react';


export const UploadDocumentButton = memo(() => {
  const onFilesSelect = (files: File[])=> {
    const formData = new FormData()

    files.forEach(f => {
      formData.append('files', f)
    })
  }

  return (
    <>
      <UploadButton
        Icon={DocumentSvg}
        column
        aria-label="Download Document"
        accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt,.rtf,.csv,.odt,.ods,.odp"
        onFilesSelect={onFilesSelect}
      >
        Document
      </UploadButton>
    </>
  )
})

UploadDocumentButton.displayName = 'UploadDocumentButton';


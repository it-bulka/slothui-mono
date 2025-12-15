import { UploadButton } from '@/shared/ui';
import DocumentSvg from '@/shared/assets/images/actions/document.svg?react'
import { memo } from 'react';

interface UploadDocumentButtonProps {
  onFilesSelect: (files: File[]) => void;
}

export const UploadDocumentButton = memo(({ onFilesSelect }: UploadDocumentButtonProps) => {
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


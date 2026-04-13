import type { Attachment } from '../../../../../types';
import { shortenMiddle } from '@/shared/libs';
import type { ReactNode } from 'react';

type AttachmentDocumentProps = Pick<Attachment, 'url' | 'originalName'> & {
  size: number;
  additionalComp?: ReactNode
}

const EXT_COLORS: Record<string, { bg: string; label: string }> = {
  pdf:  { bg: '#EF4444', label: 'PDF' },
  doc:  { bg: '#3B82F6', label: 'DOC' },
  docx: { bg: '#3B82F6', label: 'DOC' },
  xls:  { bg: '#22C55E', label: 'XLS' },
  xlsx: { bg: '#22C55E', label: 'XLS' },
  ppt:  { bg: '#F97316', label: 'PPT' },
  pptx: { bg: '#F97316', label: 'PPT' },
  zip:  { bg: '#8B5CF6', label: 'ZIP' },
  rar:  { bg: '#8B5CF6', label: 'RAR' },
  txt:  { bg: '#64748B', label: 'TXT' },
};

const getExt = (name: string) => name.split('.').pop()?.toLowerCase() ?? '';

const formatSize = (bytes: number) => {
  if (bytes < 1024) return bytes + ' B';
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
  return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
};

/* Icon width in px — used to indent the size text so it aligns under the title */
const ICON_W = 20; // w-5 = 1.25rem = 20px
const ICON_GAP = 6; // gap-1.5

export const AttachmentDocument = ({ url, originalName, size, additionalComp }: AttachmentDocumentProps) => {
  const ext = getExt(originalName);
  const badge = EXT_COLORS[ext] ?? { bg: '#6366F1', label: ext.toUpperCase() || 'FILE' };

  return (
    <div className="flex items-center gap-3 py-1">
      {/* name + size column */}
      <div className="flex flex-col min-w-0 grow">
        {/* title row: small inline icon + filename */}
        <div className="flex items-center gap-1.5">
          <span
            className="inline-flex items-center justify-center w-5 h-5 rounded text-[8px] font-bold text-white shrink-0"
            style={{ background: badge.bg }}
          >
            {badge.label}
          </span>
          <span className="text-sm font-semibold truncate text-dark">
            {shortenMiddle(originalName)}
          </span>
        </div>

        {/* size — indented to align visually under the title (past icon + gap) */}
        <span
          className="text-xs text-gray-g1"
          style={{ paddingLeft: ICON_W + ICON_GAP }}
        >
          {formatSize(size)}
        </span>
      </div>

      {/* download */}
      <a
        href={url}
        download={originalName}
        className="inline-flex items-center justify-center w-7 h-7 rounded-lg bg-light-l3 hover:bg-blue-b4 text-sm text-gray-g1 hover:text-blue-b1 transition-colors shrink-0"
        onClick={(e) => e.stopPropagation()}
      >
        ↓
      </a>

      {additionalComp}
    </div>
  );
};

import { useCallback } from 'react';
import { twMerge } from 'tailwind-merge';
import classNames from 'classnames';
import { ContactPlatformIcon } from '@/shared/ui/ContactPlatformIcon/ContactPlatformIcon';
import { CopyButton } from '@/shared/ui/CopyButton';
import { detectContactMeta } from '@/shared/utils/contacts/detectPlatform';
import type { ContactDraft } from '../model/types/contactDraft.types';
import type { ContactType, ContactPlatform } from '@/shared/types/contacts.types';
import DeleteIcon from '@/shared/assets/images/actions/delete.svg?react';

interface ContactRowProps {
  draft: ContactDraft;
  onEdit: (tempId: string, value: string, type: ContactType, platform: ContactPlatform | null) => void;
  onToggleDelete: (tempId: string) => void;
}

export const ContactRow = ({ draft, onEdit, onToggleDelete }: ContactRowProps) => {
  const isDirty = !!draft.id && draft.value !== draft.originalValue && !draft.isDeleted;

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const v = e.target.value;
      const { type, platform } = detectContactMeta(v);
      onEdit(draft.tempId, v, type, platform);
    },
    [draft.tempId, onEdit],
  );

  return (
    <div
      className={twMerge(classNames(
        'flex items-center gap-2 py-2 px-1 rounded-lg transition-all',
        {
          'opacity-50': draft.isDeleted,
          'border-l-2 border-blue-300 pl-2 bg-blue-50/30': isDirty,
        },
      ))}
    >
      <div className="text-blue-b1 shrink-0">
        <ContactPlatformIcon type={draft.type} platform={draft.platform} className="w-5 h-5" />
      </div>

      <input
        type="text"
        value={draft.value}
        onChange={handleChange}
        disabled={draft.isDeleted}
        className={twMerge(classNames(
          'flex-1 text-sm bg-transparent outline-none min-w-0 pb-0.5',
          'border-b border-transparent focus:border-gray-300 transition-colors',
          { 'line-through text-gray-400 cursor-default': draft.isDeleted },
        ))}
      />

      {!draft.isDeleted && (
        <CopyButton textToCopy={draft.value} className="shrink-0" />
      )}

      <button
        type="button"
        onClick={() => onToggleDelete(draft.tempId)}
        title={draft.isDeleted ? 'Restore' : 'Delete'}
        className={classNames(
          'shrink-0 p-1 rounded transition-colors',
          draft.isDeleted
            ? 'text-blue-500 hover:text-blue-700'
            : 'text-gray-400 hover:text-red-500',
        )}
      >
        {draft.isDeleted ? (
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3 7v6h6" />
            <path d="M3 13C5 8.6 9.3 6 14 6c4.5 0 8.4 2.8 10 7" />
          </svg>
        ) : (
          <DeleteIcon className="w-4 h-4" />
        )}
      </button>
    </div>
  );
};

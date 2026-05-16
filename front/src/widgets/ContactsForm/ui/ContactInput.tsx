import { useState, useCallback } from 'react';
import { ContactPlatformIcon } from '@/shared/ui/ContactPlatformIcon/ContactPlatformIcon';
import { detectContactMeta } from '@/shared/utils/contacts/detectPlatform';
import type { ContactPlatform, ContactType } from '@/shared/types/contacts.types';

interface ContactInputProps {
  onValueChange: (value: string, type: ContactType, platform: ContactPlatform | null) => void;
  onDiscard: () => void;
  initialValue?: string;
}

export const ContactInput = ({ onValueChange, onDiscard, initialValue = '' }: ContactInputProps) => {
  const [value, setValue] = useState(initialValue);
  const [meta, setMeta] = useState(() => detectContactMeta(initialValue));

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const v = e.target.value;
      setValue(v);
      const detected = detectContactMeta(v);
      setMeta(detected);
      onValueChange(v, detected.type, detected.platform);
    },
    [onValueChange],
  );

  return (
    <div className="flex items-center gap-2 py-1">
      <div className="text-blue-b1 shrink-0">
        <ContactPlatformIcon type={meta.type} platform={meta.platform} className="w-5 h-5" />
      </div>
      <input
        type="text"
        value={value}
        onChange={handleChange}
        placeholder="URL, email, phone or @username"
        autoFocus
        className="flex-1 text-sm bg-transparent outline-none border-b border-gray-200 focus:border-blue-400 pb-0.5 transition-colors min-w-0"
      />
      <button
        type="button"
        onClick={onDiscard}
        aria-label="Discard"
        className="text-gray-400 hover:text-gray-600 shrink-0 p-1 transition-colors"
      >
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>
    </div>
  );
};

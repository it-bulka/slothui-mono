import { useState, useRef, useLayoutEffect, useEffect, useCallback } from 'react';
import { flushSync } from 'react-dom';
import classnames from 'classnames';
import CloseIcon from '@/shared/assets/images/actions/close.svg?react';
import CheckIcon from '@/shared/assets/images/general/checked.svg?react';
import cls from './EditMessageOverlay.module.css';

interface EditMessageOverlayProps {
  initialText: string;
  isAuthor: boolean;
  onCancel: () => void;
  onSubmit: (text: string) => Promise<void>;
}

export const EditMessageOverlay = ({
  initialText,
  isAuthor,
  onCancel,
  onSubmit,
}: EditMessageOverlayProps) => {
  const [saving, setSaving] = useState(false);
  const [overlayWidth, setOverlayWidth] = useState<number | null>(null);
  const textRef = useRef(initialText);
  const overlayRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  // useLayoutEffect: runs before paint — no flicker when width jumps to 60% of container
  useLayoutEffect(() => {
    // DOM chain: overlay → MessageWrapper → MessageBubble → Virtuoso row div
    const rowEl = overlayRef.current?.parentElement?.parentElement?.parentElement;
    if (rowEl) setOverlayWidth(rowEl.offsetWidth * 0.6);

    const el = contentRef.current;
    if (!el) return;
    el.innerText = initialText;
    el.focus();
    const range = document.createRange();
    range.selectNodeContents(el);
    range.collapse(false);
    const sel = window.getSelection();
    sel?.removeAllRanges();
    sel?.addRange(range);
  }, [initialText]);

  useEffect(() => {
    const handleMouseDown = (e: MouseEvent) => {
      if (overlayRef.current && !overlayRef.current.contains(e.target as Node)) {
        flushSync(() => onCancel());
      }
    };
    document.addEventListener('mousedown', handleMouseDown);
    return () => document.removeEventListener('mousedown', handleMouseDown);
  }, [onCancel]);

  const handleInput = (e: React.FormEvent<HTMLDivElement>) => {
    textRef.current = e.currentTarget.innerText;
  };

  // Strip rich text on paste
  const handlePaste = (e: React.ClipboardEvent<HTMLDivElement>) => {
    e.preventDefault();
    document.execCommand('insertText', false, e.clipboardData.getData('text/plain'));
  };

  const handleSave = useCallback(async () => {
    const trimmed = textRef.current.trim();
    if (!trimmed || trimmed === initialText || saving) return;
    setSaving(true);
    try {
      await onSubmit(trimmed);
    } catch {
      setSaving(false);
    }
  }, [initialText, onSubmit, saving]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Escape') { e.preventDefault(); onCancel(); }
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSave(); }
  };

  return (
    <div
      ref={overlayRef}
      className={classnames(cls.overlay, { [cls.self]: isAuthor, [cls.other]: !isAuthor })}
      style={{ '--edit-overlay-w': overlayWidth ? `${overlayWidth}px` : undefined } as React.CSSProperties}
    >
      <div
        ref={contentRef}
        contentEditable={!saving}
        suppressContentEditableWarning
        onInput={handleInput}
        onPaste={handlePaste}
        onKeyDown={handleKeyDown}
        className={cls.content}
      />
      <div className="flex flex-col gap-1 justify-start items-center shrink-0 pl-2">
        <button
          onClick={onCancel}
          disabled={saving}
          aria-label="Cancel edit"
          className="p-1 rounded-lg text-gray-g1 hover:text-dark opacity-70 hover:opacity-100 transition-all"
        >
          <CloseIcon className="w-4 h-4" />
        </button>
        <button
          onClick={handleSave}
          disabled={saving}
          aria-label="Save edit"
          className="p-1 rounded-lg text-green-g2 disabled:opacity-40 hover:opacity-100 opacity-80 transition-all"
        >
          <CheckIcon className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

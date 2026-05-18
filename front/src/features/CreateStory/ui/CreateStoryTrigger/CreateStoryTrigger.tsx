import { useRef, useCallback, memo } from 'react';
import { useCreateStory } from '../../model/hooks/useCreateStory.ts';
import DefaultAvatar from '@/shared/assets/images/default/avatar-default.png';
import { ImageWithFallback } from '@/shared/ui/ImageWithFallback';

interface CreateStoryTriggerProps {
  variant: 'add-first' | 'add-more';
  avatarSrc?: string;
  onCreated?: () => void;
}

export const CreateStoryTrigger = memo(({ variant, avatarSrc, onCreated }: CreateStoryTriggerProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const { createStory, isLoading } = useCreateStory();

  const handleClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    inputRef.current?.click();
  }, []);

  const handleChange = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    await createStory(file);
    e.target.value = '';
    onCreated?.();
  }, [createStory, onCreated]);

  if (variant === 'add-more') {
    return (
      <>
        <button
          onClick={handleClick}
          disabled={isLoading}
          className="absolute bottom-0 right-0 w-6 h-6 rounded-full bg-blue-500 border-2 border-white flex items-center justify-center text-white text-xs font-bold z-10 hover:bg-blue-600 transition-colors disabled:opacity-60"
          aria-label="Add story"
        >
          +
        </button>
        <input
          ref={inputRef}
          type="file"
          accept="image/*,video/*"
          className="hidden"
          onChange={handleChange}
        />
      </>
    );
  }

  return (
    <button
      onClick={handleClick}
      disabled={isLoading}
      className="flex flex-col gap-2 items-center text-gray-g1 text-semibold text-xs max-w-[66px] disabled:opacity-60"
      aria-label="Add your first story"
    >
      <div className="w-[66px] h-[66px] rounded-full border-2 border-dashed border-blue-500 flex items-center justify-center relative overflow-hidden">
        {avatarSrc ? (
          <ImageWithFallback
            src={avatarSrc}
            fallback={DefaultAvatar}
            alt="avatar"
            className="w-full h-full object-cover opacity-40"
          />
        ) : null}
        <span className="absolute text-blue-500 text-2xl font-light leading-none">+</span>
      </div>
      <p className="text-center">Add story</p>
      <input
        ref={inputRef}
        type="file"
        accept="image/*,video/*"
        className="hidden"
        onChange={handleChange}
      />
    </button>
  );
});

CreateStoryTrigger.displayName = 'CreateStoryTrigger';

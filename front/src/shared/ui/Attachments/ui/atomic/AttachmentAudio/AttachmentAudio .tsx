import type { Attachment } from '../../../../../types';
import { type ReactNode, useCallback } from 'react';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import { shortenMiddle } from '@/shared/libs';

type AttachmentAudioProps = Pick<Attachment, 'url' | 'originalName'> & {
  size?: number;
  additionalComp?: ReactNode
}

export const AttachmentAudio = ({ url, originalName, size }: AttachmentAudioProps) => {
  const formatSize = useCallback((bytes?: number) => {
    if (!bytes) return '';
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  }, []);

  return (
    <div className="flex flex-col gap-1">
      {/* title + size — outside border */}
      <div className="flex items-baseline gap-2 px-1">
        <p className="text-sm font-semibold grow truncate" style={{ color: 'var(--color-dark)' }}>
          {originalName ? shortenMiddle(originalName) : 'Audio file'}
        </p>
        {size && (
          <span className="text-xs shrink-0" style={{ color: 'var(--color-gray-g1)' }}>
            {formatSize(size)}
          </span>
        )}
        <a
          href={url}
          download
          className="text-sm shrink-0 text-gray-g1 hover:text-blue-b1 transition-colors"
          onClick={(e) => e.stopPropagation()}
        >
          ↓
        </a>
      </div>

      {/* player — inside border */}
      <div
        className="rounded-lg overflow-hidden"
        style={{ background: 'var(--color-light-l3)', border: '1px solid var(--color-gray-g3)' }}
      >
        <AudioPlayer
          src={url}
          showJumpControls={false}
          customVolumeControls={[]}
          customAdditionalControls={[]}
          layout="horizontal-reverse"
          style={{
            background: 'transparent',
            border: 'none',
            boxShadow: 'none',
            padding: '3px 12px',
            fontSize: '0.7rem',
            color: 'var(--color-dark)',
          }}
          customIcons={{
            play: (
              <span
                className="flex items-center justify-center w-7 h-7 rounded-full text-xs"
                style={{ background: 'var(--color-blue-b1)', color: '#fff' }}
              >
                ▶
              </span>
            ),
            pause: (
              <span
                className="flex items-center justify-center w-7 h-7 rounded-full text-xs"
                style={{ background: 'var(--color-blue-b1)', color: '#fff' }}
              >
                ❚❚
              </span>
            ),
          }}
        />
      </div>
    </div>
  );
};

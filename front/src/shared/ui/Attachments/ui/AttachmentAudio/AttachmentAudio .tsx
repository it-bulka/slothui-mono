import type { Attachment } from '../../model/type/attachment.dto.ts';
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
    <div className="attachment-audio flex flex-col gap-1 p-2 ">
      <div className="flex align-bottom gap-1">
        <p className="text-sm font-medium grow">{originalName ? shortenMiddle(originalName) : 'Audio file'}</p>
        {size && (
          <span className="text-xs text-gray-500">{formatSize(size)}</span>
        )}
      </div>

      <div className="flex justify-center items-center gap-2 bg-gray-g2 rounded-sm">
        <AudioPlayer
          src={url}
          showJumpControls={false}
          customVolumeControls={[]}
          layout="horizontal-reverse"
          style={{
            height: '40px',
            border: 'none',
            backgroundColor: 'transparent',
            fontSize: '0.75rem',
            padding: '0',
            boxShadow: 'none',
          }}
          customIcons={{
            play: <span className="text-sm flex items-center justify-center">▶</span>,
            pause: <span className="text-sm flex items-center justify-center">❚❚</span>,
          }}
          customAdditionalControls={[]}
        />
        <a key="download" href={url} download="audio.mp3" className="w-[20px] flex justify-center items-center">⤓</a>
      </div>
    </div>
  );
};
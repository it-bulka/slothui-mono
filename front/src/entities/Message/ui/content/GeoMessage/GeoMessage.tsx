import { MapView } from '@/entities';
import { MessageTime } from '@/entities/Message/ui/MessageTime/MessageTime.tsx';
import type { MessageWithGeoDto } from '@/shared/types/message.dto.ts';
import type { MessageComponent } from '@/entities/Message/model';

export const GeoMessage = ({ msg, time }: MessageComponent<MessageWithGeoDto>) => {
  if(!msg.geo) return null;
  return (
    <div className="relative inline-block">
      <MapView
        position={msg.geo.position}
        locationName={msg.geo.locationName}
        className="h-[180px] w-[340px]"
      />
      <MessageTime time={time} position="absolute" variant="onMedia" />
    </div>
    )
}
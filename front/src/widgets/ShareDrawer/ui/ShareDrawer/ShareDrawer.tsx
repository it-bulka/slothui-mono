import { Drawer, Divider, Typography, TypographyTypes } from '@/shared/ui';
import { type SharePayload, sendShare, getSharableLink } from '../../model';
import { ChatPicker } from '../../../ChatPicker';
import { useMessagesService } from '@/shared/libs/services';
import { ShareContent } from '@/features/ShareOnSocialMedia/ui/ShareContent/ShareContent.async.tsx';

interface ShareDrawerProps {
  payload: SharePayload
  isOpen: boolean
  onClose: () => void
}

export const ShareDrawer = ({ payload, isOpen, onClose }: ShareDrawerProps) => {
  const messagesService = useMessagesService();

  const handleSend = async (chatId: string) => {
    await sendShare(messagesService, chatId, payload)
    onClose()
  }

  return (
    <Drawer isOpen={isOpen} onClose={onClose}>
      <div className="flex flex-col gap-3" style={{ height: 'calc(100dvh - 130px)' }}>
        <section className="flex flex-col gap-2 flex-1 min-h-0 overflow-hidden">
          <Typography variant="h3" type={TypographyTypes.BLOCK_TITLE}>Send to</Typography>
          <ChatPicker onSelect={handleSend} />
        </section>

        <Divider />

        <section className="flex-shrink-0 flex flex-col gap-2">
          <Typography variant="h3" type={TypographyTypes.BLOCK_TITLE}>Share to social media</Typography>
          {isOpen && <ShareContent sharableLink={getSharableLink(payload)} />}
        </section>
      </div>
    </Drawer>
  )
}

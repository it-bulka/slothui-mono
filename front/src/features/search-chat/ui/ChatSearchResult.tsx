import { LocalChatsSearchResult } from './LocalSearchResult/LocalSearchResult.tsx';
import { GlobalChatsSearchResult } from './GlobalChatsSearchResult/GlobalChatsSearchResult.tsx';
import { NoChatYet } from './NoChatYet/NoChatYet.tsx';

export const ChatSearchResult = ({ className }: { className?: string }) => {
  return (
    <div className={className}>
      <LocalChatsSearchResult />
      <GlobalChatsSearchResult />
      <NoChatYet />
    </div>
  )
}
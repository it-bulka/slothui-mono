import { useState, useCallback } from 'react';
import {
  List,
  SearchBar,
  Typography,
  TypographyTypes,
  AvatarWithInfo,
  Badge
} from '@/shared/ui';
import ArrowUpSvg from '@/shared/assets/images/general/arrow-up-right.svg?react'
import { mockMessages } from '@/mock/data';
import { useFetchSearchedChats } from '@/entities';


const MessagesAll = () => {
  const [query, setQuery] = useState('');
  const { onSearchChange } = useFetchSearchedChats()

  const handleSearchChange = useCallback((val: string) => {
    setQuery(val)
    onSearchChange(val)
  }, [onSearchChange, setQuery]);

  return (
    <div className="bg-underground-secondary min-h-full">
      <div className={"border-style-b px-main py-5 flex flex-wrap justify-between bg-underground-primary"}>
        <SearchBar
          placeholder={"Search for friends"}
          size="lg"
          iconPosition="right"
          className="grow"
          onChange={handleSearchChange}
          value={query}
        />
      </div>
      <List className="px-main py-6">
        {mockMessages.map((message) => (
          <List.Item key={message.nickname} btnIcon={ArrowUpSvg}>
            <>
              <AvatarWithInfo src={message.user_avatar} position={message.nickname} name={message.user_name}/>
              <Typography type={TypographyTypes.P_SM} className="grow">{message.last_msg}</Typography>
              {!message.unread_count || <Badge>{message.unread_count}</Badge>}
            </>
          </List.Item>
        ))}
      </List>
    </div>
  )
}

export default MessagesAll
import { BlockTitle } from '@/widgets';
import { AvatarWithInfo, List } from '@/shared/ui';
import ArrowUpRightSvg from "@/shared/assets/images/general/arrow-up-right.svg?react"

interface UserContactInformationProps {
  contacts: {
    avatarSrc?: string | null,
    username: string,
    nickname: string,
  }[]
}
export const UserContactInformation = ({contacts}: UserContactInformationProps) => {
  return (
    <div>
      <BlockTitle title="Contact Information" withMargin />
      <List>
        {contacts.map((item) => (
          <List.Item key={item.nickname} btnIcon={ArrowUpRightSvg}>
            <AvatarWithInfo src={item.avatarSrc} position={item.username}/>
          </List.Item>
        ))}
      </List>
    </div>
  )
}
import { AvatarWithInfo, List, Typography, TypographyTypes } from '@/shared/ui';
import ArrowUpRightSvg from "@/shared/assets/images/general/arrow-up-right.svg?react"
import { SidebarInfoCard } from '../SidebarInfoCard.tsx';

interface UserContactInformationProps {
  contacts: {
    avatarSrc?: string | null,
    username: string,
    nickname: string,
  }[]
}

export const UserContactInformation = ({ contacts }: UserContactInformationProps) => {
  return (
    <SidebarInfoCard title="Contact Information">
      {contacts.length === 0 ? (
        <Typography type={TypographyTypes.P_SM} className="text-gray-g2">
          No contact information yet
        </Typography>
      ) : (
        <List>
          {contacts.map((item) => (
            <List.Item key={item.nickname} btnIcon={ArrowUpRightSvg}>
              <AvatarWithInfo src={item.avatarSrc} position={item.username} />
            </List.Item>
          ))}
        </List>
      )}
    </SidebarInfoCard>
  )
}

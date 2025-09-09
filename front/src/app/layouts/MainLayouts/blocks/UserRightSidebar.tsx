import { AvatarWithStatus, TypographyTypes, Typography, List, AvatarWithInfo, Statistics } from '@/shared/ui';
import { StoryAvatar } from '@/entities';
import { BlockTitle } from '@/widgets';
import ArrowUpRightSvg from "@/shared/assets/images/general/arrow-up-right.svg?react"
import MockAvatar from '@/mock/images/avatar.png'
import { statistics } from '@/mock/data';


export const UserRightSidebar = () => {
  //TODO: remove mock data
  const userData = {
    avatarSrc: MockAvatar,
    isOnline: false,
    name: 'User Name',
    nickname: "nickname",
  }

  const stories = [
    {
      avatarSrc: MockAvatar,
      username: 'username',
      nickname: "nickname1",
    }
  ]

  const contacts = [
    { avatarSrc: MockAvatar, nickname: "nickname1", username: 'username1' },
  ]

  return (
    <div className="px-sidebar py-sidebar border-style-l bg-underground-secondary">
      <div>
        <AvatarWithStatus src={userData.avatarSrc} isOnline={userData.isOnline} className="mb-4 ml-auto mr-auto"/>
        <Typography className="text-center" bold type={TypographyTypes.P_SM}>{userData.name}</Typography>
        <Typography className="text-center" type={TypographyTypes.P_SM}>{userData.nickname}</Typography>
      </div>

      <Statistics data={statistics} />

      <div>
        <BlockTitle
          title="About Me"
          withMargin
        />
        <Typography type={TypographyTypes.P_SM}>
          Hi there! 👋 I'm X-AE-A-19, an AI enthusiast and fitness aficionado. When I'm not crunching numbers or optimizing algorithms, you can find me hitting the gym.
        </Typography>
      </div>

      <div>
        <BlockTitle title="Story Highlights" withMargin />
        <div>
          {stories.map((item) => (
            <StoryAvatar avatarSrc={item.avatarSrc} username={item.username} key={item.nickname} />
          ))}
        </div>
      </div>

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

      <BlockTitle title="Friends" CustomBtnIcon={ArrowUpRightSvg} onBtnClick={() => {}}/>
    </div>
  )
}
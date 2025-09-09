import { Tab, List, AvatarWithInfo, type AvatarWithInfoProps } from '@/shared/ui';
import mockAvatar  from '@/mock/images/avatar.png'

const mockTabs: {tabs: string[], contents: AvatarWithInfoProps[][]} = {
  tabs: [
    "Following",
    "Followers"
  ],
  contents: [
    [
      { src: mockAvatar, position: "jkjkjkjk", name: "Name" },
      { src: mockAvatar, position: "jkjkjkjk", name: "Name" },
      { src: mockAvatar, position: "jkjkjkjk", name: "Name" },
      { src: mockAvatar, position: "jkjkjkjk", name: "Name" }
    ],
    [
      { src: mockAvatar, position: "jkjkjkjk", name: "Followers" },
      { src: mockAvatar, position: "jkjkjkjk", name: "Name" },
    ]
  ]
}

const Friends = () => {
  return (
    <>
      <Tab
        tabs={mockTabs.tabs}
        contents={mockTabs.contents.map(items => (
          <List>
            {items.map(friend => (
              <List.Item btnText="+">
                <AvatarWithInfo src={friend.src} position={friend.position} name={friend.name} />
              </List.Item>
            ))}
          </List>
        ))}
      />
    </>
  )
}

export default Friends
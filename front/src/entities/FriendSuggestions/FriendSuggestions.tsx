import { AppLink, AvatarWithInfo } from '@/shared/ui';
import { BlockTitle } from '@/widgets/BlockTitle/BlockTitle.tsx';
import { List } from '@/shared/ui';

const suggestions = [
  {
    avatarSrc: '/',
    userPosition: 'some position',
    userName: 'userName'
  }
]
export const FriendSuggestions = () => {
  return (
    <div>
      {/*TODO: add redirection*/}
      <BlockTitle
        title="Friend Suggestions"
        withMargin
        customBtn={(<AppLink to={'/'} className="text-lg font-bold">See All</AppLink>)}
      />

      <List>
        {suggestions.map(({ avatarSrc, userPosition, userName }) => (
          <List.Item btnText="+">
            <AvatarWithInfo src={avatarSrc} position={userPosition} name={userName} titleClass="text-sm text-gray-g1"/>
          </List.Item>
        ))}
      </List>
    </div>
  );
}
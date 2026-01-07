import { AppLink } from '@/shared/ui';
import { BlockTitle } from '@/widgets/BlockTitle/BlockTitle.tsx';
import { getFriendsSuggestionsPage } from '@/shared/config/routeConfig/routeConfig.tsx';
import { FriendsListWithActions } from '@/features';
import { useLocation } from 'react-router';
import { useMemo } from 'react';

const suggestions = [
  {
    id: '1',
    src: '/',
    name: 'some position',
    nickname: 'userName',

    isFollowing: false,
    isFollower: true
  }
]
export const FriendSuggestions = () => {
  const location = useLocation()
  const isFriendsSuggestionsPage = useMemo(() => {
    return location.pathname.includes(getFriendsSuggestionsPage());
  }, [location.pathname])

  if(isFriendsSuggestionsPage) return null;

  return (
    <div>
      {/*TODO: add redirection*/}
      <BlockTitle
        title="Friend Suggestions"
        withMargin
        customBtn={(<AppLink to={getFriendsSuggestionsPage()} className="text-lg font-bold">See All</AppLink>)}
      />

      <FriendsListWithActions friends={suggestions} />
    </div>
  );
}
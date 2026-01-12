import { AppLink } from '@/shared/ui';
import { BlockTitle } from '@/widgets/BlockTitle/BlockTitle.tsx';
import { getFriendsSuggestionsPage } from '@/shared/config/routeConfig/routeConfig.tsx';
import { FriendsListWithActions } from '@/features';
import { useLocation } from 'react-router';
import { memo, useEffect } from 'react';
import { useFetchFriendsSuggestions, useSuggestedFriendsSelect } from '../Friends';
import { useAuthUserSelector } from '../AuthUser';

export const FriendSuggestions = memo(() => {
  const location = useLocation()
  const isFriendsSuggestionsPage = location.pathname.includes(getFriendsSuggestionsPage());

  const user = useAuthUserSelector()
  const friendsSuggestions = useSuggestedFriendsSelect()
  const { fetchFriendsSuggestions } = useFetchFriendsSuggestions()

  useEffect(() => {
    if (!user || friendsSuggestions.length > 0) return;
    fetchFriendsSuggestions(user.id);
  }, [fetchFriendsSuggestions, user, friendsSuggestions.length]);

  if(isFriendsSuggestionsPage) return null;

  return (
    <div>
      {/*TODO: add redirection*/}
      <BlockTitle
        title="Friend Suggestions"
        withMargin
        customBtn={(<AppLink to={getFriendsSuggestionsPage()} className="text-lg font-bold">See All</AppLink>)}
      />

      <FriendsListWithActions friends={friendsSuggestions} />
    </div>
  );
})

FriendSuggestions.displayName = 'FriendSuggestions';
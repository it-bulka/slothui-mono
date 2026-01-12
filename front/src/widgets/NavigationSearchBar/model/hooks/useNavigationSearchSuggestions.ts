import { useState, useEffect, useMemo } from 'react';
import debounce from 'lodash/debounce';
import {
  getHomePage,
  getChatsPage,
  getAllMessagesPage,
  getFriendsPage,
  getFriendsSuggestionsPage,
  getMePage,
  getMyPostsPage,
  getMyEventsPage,
  getStoredPostsPage,
  getSettingsPage,
  getSettingsProfilePage,
  getSettingsAccountPage,
  getSettingsPrivacyPage
} from '@/shared/config/routeConfig/routeConfig.tsx';
import { type SearchSuggestionsType } from '@/shared/ui/SearchSuggestionsList';

export const searchSuggestions: SearchSuggestionsType[] = [
  { id: 'home', name: 'Home', path: getHomePage() },
  { id: 'feed', name: 'Feed', path: getHomePage() },
  { id: 'chats', name: 'Chats', path: getChatsPage() },
  { id: 'messages', name: 'All Messages', path: getAllMessagesPage() },
  { id: 'friends', name: 'Friends', path: getFriendsPage() },
  { id: 'friend-suggestions', name: 'Friend Suggestions', path: getFriendsSuggestionsPage() },
  { id: 'me', name: 'My Profile', path: getMePage() },
  { id: 'my-posts', name: 'My Posts', path: getMyPostsPage() },
  { id: 'my-events', name: 'My Events', path: getMyEventsPage() },
  { id: 'stored-posts', name: 'Saved Posts', path: getStoredPostsPage() },
  { id: 'settings', name: 'Settings', path: getSettingsPage() },
  { id: 'profile-settings', name: 'Profile Settings', path: getSettingsProfilePage() },
  { id: 'account-settings', name: 'Account Settings', path: getSettingsAccountPage() },
  { id: 'privacy-settings', name: 'Privacy Settings', path: getSettingsPrivacyPage() },
];

export const useNavigationSearchSuggestions = () => {
  const [results, setResults] = useState<SearchSuggestionsType[]>([]);

  const debouncedSearch = useMemo(
    () =>
      debounce((query: string) => {
        if (!query) {
          setResults([]);
          return;
        }

        try {
          const regex = new RegExp(query, 'i');
          setResults(
            searchSuggestions.filter(item => regex.test(item.name))
          );
        } catch {
          setResults([]);
        }
      }, 200),
    []
  );

  const onSearchChange = (val: string) => {
    debouncedSearch(val);
  };

  useEffect(() => {
    return () => {
      debouncedSearch.cancel();
    };
  }, [debouncedSearch]);

  return {
    results,
    onSearchChange
  };
};

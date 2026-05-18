import { lazy } from 'react';
import { withSuspense } from '@/shared/libs/withSuspense';

const MyFriendsSuggestionsAsync = lazy(() => import("./FriendsSuggestions.tsx"))
export const MyFriendsSuggestionsPage = withSuspense(MyFriendsSuggestionsAsync)
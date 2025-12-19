import type { UserStories } from '@/shared/libs/services/storiesService/stories.type.tsx';

export const mockStories: UserStories[] = [
  {
    userId: 'u1',
    username: 'u1',
    avatar: 'https://i.pravatar.cc/150?img=1',
    storiesAmount: 2,
    stories: [
      {
        id: 's1',
        url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
        type: 'video',
        duration: 5000,
        isViewed: true,
      },
      {
        id: 's3',
        url: 'https://i.pravatar.cc/150?img=2',
        type: 'image',
        duration: 4000,
        isViewed: false,
      },
    ],
  },
  {
    userId: 'u2',
    username: 'u2',
    avatar: 'https://i.pravatar.cc/150?img=3',
    storiesAmount: 2,
    stories: [
      {
        id: 's4',
        url: 'https://i.pravatar.cc/150?img=4',
        type: 'image',
        duration: 6000,
        isViewed: true,
      },
    ],
  },
  {
    userId: 'u3',
    username: 'u3',
    avatar: 'https://i.pravatar.cc/150?img=5',
    storiesAmount: 4,
    stories: [
      {
        id: 's6',
        url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
        type: 'video',
        duration: 5000,
        isViewed: false,
      },
      {
        id: 's7',
        url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
        type: 'video',
        duration: 5000,
        isViewed: false,
      },
      {
        id: 's9',
        url: 'https://i.pravatar.cc/150?img=8',
        type: 'image',
        duration: 4000,
        isViewed: false,
      },
    ],
  },
  {
    avatar: 'https://i.pravatar.cc/150?img=4',
    username: 'ethan',
    userId: 'ethan',
    storiesAmount: 2,
    stories: [
      {
        id: 's3',
        url: 'https://i.pravatar.cc/150?img=9',
        type: 'image',
        duration: 4000,
        isViewed: false,
      },
      {
        id: 's3',
        url: 'https://i.pravatar.cc/150?img=12',
        type: 'image',
        duration: 4000,
        isViewed: false,
      },
      {
        id: 's3',
        url: 'https://i.pravatar.cc/150?img=13',
        type: 'image',
        duration: 4000,
        isViewed: false,
      },
    ]
  },
  {
    avatar: 'https://i.pravatar.cc/150?img=5',
    username: 'chloe',
    userId: 'chloe',
    storiesAmount: 1,
    stories: [
      {
        id: 's1',
        url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
        type: 'video',
        duration: 5000,
        isViewed: true,
      }
    ],
  },
  {
    avatar: 'https://i.pravatar.cc/150?img=6',
    username: 'oliver',
    userId: 'oliver',
    storiesAmount: 2,
    stories: [
      {
        id: 's1',
        url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
        type: 'video',
        duration: 5000,
        isViewed: true,
      },
      {
        id: 's3',
        url: 'https://i.pravatar.cc/150?img=2',
        type: 'image',
        duration: 4000,
        isViewed: false,
      },
    ],
  },
  {
    avatar: 'https://i.pravatar.cc/150?img=7',
    username: 'isla',
    userId: 'isla',
    storiesAmount: 2,
    stories: [
      {
        id: 's3',
        url: 'https://i.pravatar.cc/150?img=15',
        type: 'image',
        duration: 4000,
        isViewed: false,
      },
      {
        id: 's3',
        url: 'https://i.pravatar.cc/150?img=16',
        type: 'image',
        duration: 4000,
        isViewed: false,
      },
      {
        id: 's1',
        url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
        type: 'video',
        duration: 5000,
        isViewed: true,
      },
      {
        id: 's3',
        url: 'https://i.pravatar.cc/150?img=14',
        type: 'image',
        duration: 4000,
        isViewed: false,
      },
    ],
  },
  {
    userId: 's8',
    avatar: 'https://i.pravatar.cc/150?img=8',
    username: 'noah',
    storiesAmount: 2,
    stories: [
      {
        id: 's3',
        url: 'https://i.pravatar.cc/150?img=11',
        type: 'image',
        duration: 4000,
        isViewed: false,
      },
      {
        id: 's1',
        url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
        type: 'video',
        duration: 5000,
        isViewed: true,
      },
      {
        id: 's3',
        url: 'https://i.pravatar.cc/150?img=2',
        type: 'image',
        duration: 4000,
        isViewed: false,
      },
    ],
  },
];

const type = "video" as const;
export const msgWithStory = {
  chatId: '2',
  id: "jk", author: 'user 2', text: 'oooooooo', disFirst: true, createdAt: "2025-09-05T18:40:00.000Z",
  story: {
    "id": "f1766703-154c-4b54-8dbe-9a517f5e23fe",
    "user": {
      "id": "ad81aa80-7685-43d5-a360-1722ffa41e57",
      nickname: 'some nickname',
      name: "some nickname",
      avatarUrl: ""
    },
    "url": 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
    "publicId": "slothui/stories/k1udo2abzpcltqiytogx",
    "type": type,
    "duration": null,
    "createdAt": "2025-12-03T19:31:12.542Z",
    "expiresAt": "2025-12-04T20:31:12.509Z",
    "userId": "ad81aa80-7685-43d5-a360-1722ffa41e57"
  }
}



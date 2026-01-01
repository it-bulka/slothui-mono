import type { PostWithAttachmentsDto } from '@/shared/types';

export const mockPosts: PostWithAttachmentsDto[] = [
  {
    id: 'post-1',
    text: 'Hello world!',
    attachments: {
      images: [
        {
          id: 'i1',
          url: 'https://i.pravatar.cc/150?img=2',
          publicId: 'i1',
          originalName: 'i1',
          metadata: { size: 255 , format: 'image'},
          type: 'images'
        },
        {
          id: 'i2',
          url: 'https://i.pravatar.cc/150?img=5',
          publicId: 'i2',
          originalName: 'i2',
          metadata: { size: 255 , format: 'image'},
          type: 'images'
        },
        {
          id: 'i3',
          url: 'https://i.pravatar.cc/150?img=3',
          publicId: 'i3',
          originalName: 'i3',
          metadata: { size: 255 , format: 'image'},
          type: 'images'
        },
        {
          id: 'i4',
          url: 'https://i.pravatar.cc/150?img=1',
          publicId: 'i4',
          originalName: 'i4',
          metadata: { size: 255 , format: 'image'},
          type: 'images'
        },
        {
          id: 'i5',
          url: 'https://i.pravatar.cc/150?img=9',
          publicId: 'i5',
          originalName: 'i5',
          metadata: { size: 255 , format: 'image'},
          type: 'images'
        }
      ],
      video: [
        {
          url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
          id: 'v1',
          publicId: 'v1',
          originalName: 'v1',
          metadata: { size: 255 , format: 'video', thumbnailUrl: 'https://i.pravatar.cc/150?img=9'},
          type: 'video'
        },
        {
          url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
          id: 'v2',
          publicId: 'v2',
          originalName: 'v2',
          metadata: { size: 255 , format: 'video', thumbnailUrl: 'https://i.pravatar.cc/150?img=2'},
          type: 'video'
        },
        {
          url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
          id: 'v3',
          publicId: 'v3',
          originalName: 'v3',
          metadata: { size: 255 , format: 'video', thumbnailUrl: 'https://i.pravatar.cc/150?img=3'},
          type: 'video'
        }
      ],
      file: [
        {
          url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
          id: 'f1',
          publicId: 'f1',
          originalName: 'dummy.pdf',
          metadata: {
            size: 132000, // 132 KB
            format: 'pdf',
          },
          type: 'file',
        },
        {
          url: 'https://file-examples.com/storage/fe09779cd13e341fa9a316d3/2017/02/file-sample_100kB.doc',
          id: 'f2',
          publicId: 'f2',
          originalName: 'file-sample_100kB.doc',
          metadata: {
            size: 100000, // 100 KB
            format: 'doc'
          },
          type: 'file',
        },
        {
          url: 'https://file-examples.com/storage/fe09779cd13e341fa9a316d3/2017/02/zip_2MB.zip',
          id: 'f3',
          publicId: 'f3',
          originalName: 'zip_2MB.zip',
          metadata: {
            size: 2000000, // 2 MB
            format: 'zip'
          },
          type: 'file',
        }
      ],
      audio: [
        {
          url: 'https://www.learningcontainer.com/wp-content/uploads/2020/02/Kalimba.mp3',
          id: 'a1',
          publicId: 'a1',
          originalName: 'Kalimba.mp3',
          metadata: {
            size: 1100000, // ~1.1 MB
            format: 'mp3',
            duration: 21,
          },
          type: 'audio',
        },
        {
          url: 'https://file-examples.com/storage/fe9b4fa2b1d26e9dd98ec605/2017/11/file_example_MP3_1MG.mp3',
          id: 'a2',
          publicId: 'a2',
          originalName: 'file_example_MP3_1MG.mp3',
          metadata: {
            size: 1048576, // 1 MB
            format: 'mp3',
            duration: 30,
          },
          type: 'audio',
        },
        {
          url: 'https://samplelib.com/lib/preview/mp3/sample-3s.mp3',
          id: 'a3',
          publicId: 'a3',
          originalName: 'sample-3s.mp3',
          metadata: {
            size: 24000, // 24 KB
            format: 'mp3',
            duration: 3,
          },
          type: 'audio',
        }
      ],
    },
    author: {
      id: 'user-1',
      username: 'Alice',
      nickname: 'alice',
      avatarUrl: '/avatars/alice.png',
    },
    isLiked: false,
    isSaved: false,
    likesCount: 10,
    sharesCount: 2,
    savedCount: 1,
    commentsCount: 3,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'post-2',
    text: 'Second post example',
    attachments: {
      images: [
        {
          id: 'i1',
          url: 'https://i.pravatar.cc/150?img=8',
          publicId: 'i1',
          originalName: 'i1',
          metadata: { size: 255 , format: 'image'},
          type: 'images'
        },
        {
          id: 'i2',
          url: 'https://i.pravatar.cc/150?img=9',
          publicId: 'i2',
          originalName: 'i2',
          metadata: { size: 255 , format: 'image'},
          type: 'images'
        },
        {
          id: 'i3',
          url: 'https://i.pravatar.cc/150?img=11',
          publicId: 'i3',
          originalName: 'i3',
          metadata: { size: 255 , format: 'image'},
          type: 'images'
        },
        {
          id: 'i4',
          url: 'https://i.pravatar.cc/150?img=14',
          publicId: 'i4',
          originalName: 'i4',
          metadata: { size: 255 , format: 'image'},
          type: 'images'
        },
        {
          id: 'i5',
          url: 'https://i.pravatar.cc/150?img=15',
          publicId: 'i5',
          originalName: 'i5',
          metadata: { size: 255 , format: 'image'},
          type: 'images'
        }
      ],
      video: [
        {
          url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
          id: 'v1',
          publicId: 'v1',
          originalName: 'v1',
          metadata: { size: 255 , format: 'video', thumbnailUrl: 'https://i.pravatar.cc/150?img=9'},
          type: 'video'
        },
        {
          url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
          id: 'v2',
          publicId: 'v2',
          originalName: 'v2',
          metadata: { size: 255 , format: 'video', thumbnailUrl: 'https://i.pravatar.cc/150?img=2'},
          type: 'video'
        },
        {
          url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
          id: 'v3',
          publicId: 'v3',
          originalName: 'v3',
          metadata: { size: 255 , format: 'video', thumbnailUrl: 'https://i.pravatar.cc/150?img=3'},
          type: 'video'
        }
      ],
      file: [
        {
          url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
          id: 'f1',
          publicId: 'f1',
          originalName: 'dummy.pdf',
          metadata: {
            size: 132000, // 132 KB
            format: 'pdf',
          },
          type: 'file',
        },
        {
          url: 'https://file-examples.com/storage/fe09779cd13e341fa9a316d3/2017/02/file-sample_100kB.doc',
          id: 'f2',
          publicId: 'f2',
          originalName: 'file-sample_100kB.doc',
          metadata: {
            size: 100000, // 100 KB
            format: 'doc'
          },
          type: 'file',
        },
        {
          url: 'https://file-examples.com/storage/fe09779cd13e341fa9a316d3/2017/02/zip_2MB.zip',
          id: 'f3',
          publicId: 'f3',
          originalName: 'zip_2MB.zip',
          metadata: {
            size: 2000000, // 2 MB
            format: 'zip'
          },
          type: 'file',
        }
      ],
      audio: [
        {
          url: 'https://www.learningcontainer.com/wp-content/uploads/2020/02/Kalimba.mp3',
          id: 'a1',
          publicId: 'a1',
          originalName: 'Kalimba.mp3',
          metadata: {
            size: 1100000, // ~1.1 MB
            format: 'mp3',
            duration: 21,
          },
          type: 'audio',
        },
        {
          url: 'https://file-examples.com/storage/fe9b4fa2b1d26e9dd98ec605/2017/11/file_example_MP3_1MG.mp3',
          id: 'a2',
          publicId: 'a2',
          originalName: 'file_example_MP3_1MG.mp3',
          metadata: {
            size: 1048576, // 1 MB
            format: 'mp3',
            duration: 30,
          },
          type: 'audio',
        },
        {
          url: 'https://samplelib.com/lib/preview/mp3/sample-3s.mp3',
          id: 'a3',
          publicId: 'a3',
          originalName: 'sample-3s.mp3',
          metadata: {
            size: 24000, // 24 KB
            format: 'mp3',
            duration: 3,
          },
          type: 'audio',
        }
      ],
    },
    author: {
      id: 'user-2',
      username: 'Bob',
      nickname: 'bob',
      avatarUrl: '/avatars/bob.png',
    },
    isLiked: true,
    isSaved: true,
    likesCount: 5,
    sharesCount: 0,
    savedCount: 3,
    commentsCount: 1,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export const mockPostsState = {
  entities: Object.fromEntries(mockPosts.map(post => [post.id, post])),
  ids: mockPosts.map(post => post.id),
  home: {
    ids: mockPosts.map(post => post.id),
    isLoading: false,
    hasMore: true,
    nextCursor: null,
  },
  profile: {
    'user-1': {
      ids: ['post-1'],
      isLoading: false,
      hasMore: false,
      nextCursor: null,
    },
    'user-2': {
      ids: ['post-2'],
      isLoading: false,
      hasMore: false,
      nextCursor: null,
    },
  },
  saves: {
    ids: ['post-2'],
    isLoading: false,
    hasMore: false,
    nextCursor: null,
  },
  likes: {
    ids: ['post-2'],
    isLoading: false,
    hasMore: false,
    nextCursor: null,
  },
};

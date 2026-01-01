export const mockComments = {
  entities: {
    c1: {
      id: 'c1',
      postId: 'post-1',
      parentId: null,
      text: 'Це перший коментар',
      author: { id: 'u1', nickname: 'Alice', username: 'Alice' },
      createdAt: '2025-12-27T10:00:00Z',
      updatedAt: '2025-12-27T10:00:00Z',
      isEdited: false,
      repliesCount: 2,
    },
    c2: {
      id: 'c2',
      postId: 'post-1',
      parentId: null,
      text: 'Другий коментар до посту',
      author: { id: 'u2', nickname: 'Bob', username: 'Bob' },
      createdAt: '2025-12-27T10:05:00Z',
      updatedAt: '2025-12-27T10:05:00Z',
      isEdited: false,
      repliesCount: 1,
    },
    r1: {
      id: 'r1',
      postId: 'post-1',
      parentId: 'c1',
      text: 'Це реплай на перший коментар',
      author: { id: 'u3', nickname: 'Charlie', username: 'Charlie' },
      createdAt: '2025-12-27T10:10:00Z',
      updatedAt: '2025-12-27T10:10:00Z',
      isEdited: false,
      repliesCount: 0,
    },
    r2: {
      id: 'r2',
      postId: 'post-1',
      parentId: 'c1',
      text: 'Ще один реплай на перший коментар',
      author: { id: 'u4', nickname: 'Dana', username: 'Dana' },
      createdAt: '2025-12-27T10:12:00Z',
      updatedAt: '2025-12-27T10:12:00Z',
      isEdited: false,
      repliesCount: 0,
    },
    r3: {
      id: 'r3',
      postId: 'post-1',
      parentId: 'c2',
      text: 'Реплай на другий коментар',
      author: { id: 'u5', nickname: 'Eve', username: 'Eve' },
      createdAt: '2025-12-27T10:15:00Z',
      updatedAt: '2025-12-27T10:15:00Z',
      isEdited: false,
      repliesCount: 0,
    },
  },

  postComments: {
    'post-1': {
      ids: ['c1', 'c2'],
      nextCursor: null,
      hasMore: false,
      isLoading: false,
    },
  },

  replies: {
    c1: {
      ids: ['r1', 'r2'],
      nextCursor: undefined,
      hasMore: false,
      isLoading: false,
    },
    c2: {
      ids: ['r3'],
      nextCursor: undefined,
      hasMore: false,
      isLoading: false,
    },
  }
}
import type { Notification } from '@/entities/Notification';

export const NOTIFICATIONS_MOCK: Notification[] = [
  {
    id: 'mock-1',
    type: 'like',
    createdAt: new Date(Date.now() - 1000 * 60 * 5).toISOString(), // 5m ago
    read: false,
    actor: {
      id: 'u1',
      username: 'alice_dev',
      nickname: 'Alice',
      avatarUrl: null,
    },
    entityId: 'post-42',
    entityTitle: 'My first post about React',
  },
  {
    id: 'mock-2',
    type: 'comment',
    createdAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // 30m ago
    read: false,
    actor: {
      id: 'u2',
      username: 'bob_smith',
      nickname: 'Bob Smith',
      avatarUrl: null,
    },
    entityId: 'post-42',
    entityTitle: 'My first post about React',
  },
  {
    id: 'mock-3',
    type: 'follow',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2h ago
    read: false,
    actor: {
      id: 'u3',
      username: 'carol123',
      nickname: 'Carol',
      avatarUrl: null,
    },
  },
  {
    id: 'mock-4',
    type: 'like',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(), // 5h ago
    read: true,
    actor: {
      id: 'u4',
      username: 'dave_ui',
      nickname: 'Dave',
      avatarUrl: null,
    },
    entityId: 'event-7',
    entityTitle: 'Frontend Meetup 2024',
  },
  {
    id: 'mock-5',
    type: 'comment',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // 1d ago
    read: true,
    actor: {
      id: 'u5',
      username: 'eva_design',
      nickname: 'Eva Designer',
      avatarUrl: null,
    },
    entityId: 'post-15',
    entityTitle: 'CSS Grid explained',
  },
  {
    id: 'mock-6',
    type: 'follow',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(), // 2d ago
    read: true,
    actor: {
      id: 'u6',
      username: 'frank_coder',
      nickname: 'Frank',
      avatarUrl: null,
    },
  },
  {
    id: 'mock-7',
    type: 'system',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 72).toISOString(), // 3d ago
    read: true,
    entityTitle: 'Welcome to SlothUI! Your account is fully set up.',
  },
];

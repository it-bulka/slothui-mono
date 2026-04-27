import MockAvatar from '@/mock/images/avatar.png';
import type { MessageWithAttachmentsDto } from '@/shared/types/message.dto.ts';
import type { MessageProps } from '@/shared/ui/Message/Message.tsx';

export const mockMessages = [
  { user_avatar: MockAvatar, user_name: "User Name", nickname: "nickname", last_msg: "Last Message", unread_count: 5  },
]

export const messages = [
  { id: "1", author: 'user 1', text: 'jkjkjkjkjkj kjkjkjkjkj', isFirst: true, createdAt: "2025-09-05T18:42:00.000Z"},
  { id: "1", author: 'user 2', text: 'jkjkjkjkjkj kjkjkjkjkj', createdAt: "2025-09-05T18:41:00.000Z" },
  { id: "1", author: 'user 2', text: 'oooooooo', isFirst: true, createdAt: "2025-09-05T18:40:00.000Z" },
  { id: "1", author: 'user 2', text: 'oooooooo', isFirst: true, createdAt: "2025-09-05T18:40:00.000Z" },
  { id: "1", author: 'user 2', text: 'oooooooo', isFirst: true, createdAt: "2025-09-05T18:40:00.000Z" },
  { id: "1", author: 'user 2', text: 'oooooooo', isFirst: true, createdAt: "2025-09-05T18:40:00.000Z" },
  { id: "1", author: 'user 2', text: 'oooooooo', isFirst: true, createdAt: "2025-09-05T18:40:00.000Z" },
  { id: "1", author: 'user 2', text: 'oooooooo', isFirst: true, createdAt: "2025-09-05T18:40:00.000Z" },
  { id: "1", author: 'user 2', text: 'oooooooo', isFirst: true, createdAt: "2025-09-05T18:40:00.000Z" },
  { id: "1", author: 'user 2', text: 'oooooooo', isFirst: true, createdAt: "2025-09-05T18:40:00.000Z" },
  { id: "1", author: 'user 2', text: 'oooooooo', isFirst: true, createdAt: "2025-09-05T18:40:00.000Z" },
  { id: "1", author: 'user 2', text: 'oooooooo', isFirst: true, createdAt: "2025-09-05T18:40:00.000Z" },
  { id: "1", author: 'user 2', text: 'oooooooo', isFirst: true, createdAt: "2025-09-05T18:40:00.000Z" },
  { id: "1", author: 'user 2', text: 'oooooooo', isFirst: true, createdAt: "2025-09-05T18:40:00.000Z" },
  { id: "1", author: 'user 2', text: 'oooooooo', isFirst: true, createdAt: "2025-09-05T18:40:00.000Z" },
  { id: "1", author: 'user 2', text: 'oooooooo', isFirst: true, createdAt: "2025-09-05T18:40:00.000Z" },
  { id: "1", author: 'user 2', text: 'oooooooo', isFirst: true, createdAt: "2025-09-05T18:40:00.000Z" },
  { id: "1", author: 'user 2', text: 'oooooooo', isFirst: true, createdAt: "2025-09-05T18:40:00.000Z" },
  { id: "1", author: 'user 2', text: 'oooooooo', isFirst: true, createdAt: "2025-09-05T18:40:00.000Z" },
  { id: "1", author: 'user 2', text: 'oooooooo', isFirst: true, createdAt: "2025-09-05T18:40:00.000Z" },
  { id: "1", author: 'user 2', text: 'oooooooo', isFirst: true, createdAt: "2025-09-05T18:40:00.000Z" },
  { id: "1", author: 'user 2', text: 'oooooooo', isFirst: true, createdAt: "2025-09-05T18:40:00.000Z" },
  { id: "1", author: 'user 2', text: 'oooooooo', isFirst: true, createdAt: "2025-09-05T18:40:00.000Z" },
  { id: "1", author: 'user 2', text: 'oooooooo', isFirst: true, createdAt: "2025-09-05T18:40:00.000Z" },
  { id: "1", author: 'user 2', text: 'oooooooo', disFirst: true, createdAt: "2025-09-05T18:40:00.000Z" },
];

export const mockMsgWithAttachments: MessageWithAttachmentsDto & MessageProps = {
  chatId: '2',
  id: "jk",
  authorId: 'user 2',
  text: 'oooooooo',
  isFirst: true,
  time: 'jjjkjj',
  isAuthor: true,
  createdAt: new Date().toISOString(),
  attachments: [
    { id: 'i1', order: 0, type: 'images', url: 'https://i.pravatar.cc/150?img=2', publicId: 'i1', originalName: 'i1', metadata: { size: 255, format: 'image' } },
    { id: 'i2', order: 1, type: 'images', url: 'https://i.pravatar.cc/150?img=5', publicId: 'i2', originalName: 'i2', metadata: { size: 255, format: 'image' } },
    { id: 'i3', order: 2, type: 'images', url: 'https://i.pravatar.cc/150?img=3', publicId: 'i3', originalName: 'i3', metadata: { size: 255, format: 'image' } },
    { id: 'i4', order: 3, type: 'images', url: 'https://i.pravatar.cc/150?img=1', publicId: 'i4', originalName: 'i4', metadata: { size: 255, format: 'image' } },
    { id: 'i5', order: 4, type: 'images', url: 'https://i.pravatar.cc/150?img=9', publicId: 'i5', originalName: 'i5', metadata: { size: 255, format: 'image' } },
    { id: 'v1', order: 5, type: 'video', url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4', publicId: 'v1', originalName: 'v1', metadata: { size: 255, format: 'video', thumbnailUrl: 'https://i.pravatar.cc/150?img=9' } },
    { id: 'v2', order: 6, type: 'video', url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4', publicId: 'v2', originalName: 'v2', metadata: { size: 255, format: 'video', thumbnailUrl: 'https://i.pravatar.cc/150?img=2' } },
    { id: 'v3', order: 7, type: 'video', url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4', publicId: 'v3', originalName: 'v3', metadata: { size: 255, format: 'video', thumbnailUrl: 'https://i.pravatar.cc/150?img=3' } },
    { id: 'f1', order: 8, type: 'file', url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf', publicId: 'f1', originalName: 'dummy.pdf', metadata: { size: 132000, format: 'pdf' } },
    { id: 'f2', order: 9, type: 'file', url: 'https://file-examples.com/storage/fe09779cd13e341fa9a316d3/2017/02/file-sample_100kB.doc', publicId: 'f2', originalName: 'file-sample_100kB.doc', metadata: { size: 100000, format: 'doc' } },
    { id: 'f3', order: 10, type: 'file', url: 'https://file-examples.com/storage/fe09779cd13e341fa9a316d3/2017/02/zip_2MB.zip', publicId: 'f3', originalName: 'zip_2MB.zip', metadata: { size: 2000000, format: 'zip' } },
    { id: 'a1', order: 11, type: 'audio', url: 'https://www.learningcontainer.com/wp-content/uploads/2020/02/Kalimba.mp3', publicId: 'a1', originalName: 'Kalimba.mp3', metadata: { size: 1100000, format: 'mp3', duration: 21 } },
    { id: 'a2', order: 12, type: 'audio', url: 'https://file-examples.com/storage/fe9b4fa2b1d26e9dd98ec605/2017/11/file_example_MP3_1MG.mp3', publicId: 'a2', originalName: 'file_example_MP3_1MG.mp3', metadata: { size: 1048576, format: 'mp3', duration: 30 } },
    { id: 'a3', order: 13, type: 'audio', url: 'https://samplelib.com/lib/preview/mp3/sample-3s.mp3', publicId: 'a3', originalName: 'sample-3s.mp3', metadata: { size: 24000, format: 'mp3', duration: 3 } },
  ],
}
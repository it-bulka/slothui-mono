export type ChatLastMessage =
  | {
      id: string;
      type: 'text';
      text: string;
      createdAt: string;
    }
  | {
      id: string;
      type: 'attachment';
      text?: string;
      createdAt: string;
    }
  | {
      id: string;
      type: 'poll';
      text?: string;
      createdAt: string;
    }
  | {
      id: string;
      type: 'geo';
      text?: string;
      createdAt: string;
    }
  | {
      id: string;
      type: 'post';
      text?: string;
      createdAt: string;
    };

export type ChatUnreadUpdate = {
  unreadDelta: number;
  lastMessage: ChatLastMessage;
};

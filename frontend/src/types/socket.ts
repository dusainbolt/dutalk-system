export type SocketSlice = {
  isLoadingSendMessage?: boolean;
};

export type SocketSendMessageDto = { message: string; topicId: number };

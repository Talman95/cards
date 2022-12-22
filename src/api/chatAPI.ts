import socketIo from 'socket.io-client';

export type MessageType = {
  _id: string;
  message: string;
  user: {
    _id: string;
    name: string;
    avatar: string | null;
  };
};

export const chatAPI = {
  socket: null as null | any,

  createConnection(_id: string, name: string, avatar: string | null) {
    this.socket = socketIo('https://neko-back.herokuapp.com/', {
      query: { _id, name, avatar },
    });
    this.socket.emit('init');
  },

  subscribe(
    initMessagesHandler: (massages: Array<MessageType>) => void,
    newMessageSendHandler: (message: MessageType) => void,
  ) {
    this.socket?.on('init-messages-published', initMessagesHandler);
    this.socket?.on('new-message-sent', newMessageSendHandler);
  },

  sentMessage(message: string) {
    this.socket?.emit('client-message-sent', message);
  },

  destroyConnection() {
    this.socket?.disconnect();
    this.socket = null;
  },
};

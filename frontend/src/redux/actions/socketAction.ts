import { PayloadName } from '@redux/reducer';
import { sendMessageSuccess } from '@redux/slices/socketSlice';
import { socketNewTopicReceive, socketTopicMessagesReceive } from '@redux/slices/topicSlice';
import { Account, AccountRole } from '@type/account';
import { Message } from '@type/message';
import { SocketSendMessageDto, SocketTopicMessagesReceiveDto } from '@type/socket';
import { toast } from 'react-toastify';
import { Socket } from 'socket.io-client';

export type SendMessageStartAction = Record<PayloadName, SocketSendMessageDto>;
export type SendMessageSuccessAction = Record<PayloadName, Message>;

export class SocketActions {
  // instance of socket
  private _io: Socket;

  // id of user
  private _account: Account;

  // emit channel socket
  private _emit: any;

  // passing argument in constructor
  constructor(_io: Socket, _emit: any, _account: Account) {
    this._io = _io;
    this._account = _account;
    this._emit = _emit;
  }

  private isSuccess = (payload: any) => {
    if (payload?.error) {
      toast.warn(payload?.message);
      return false;
    }
    return true;
  };

  private handleMessageReceive = async (payload: SocketTopicMessagesReceiveDto) => {
    if (this.isSuccess(payload)) {
      // await Helper.delay(Constant.delaySocket);
      this._emit(sendMessageSuccess());
      this._emit(socketTopicMessagesReceive(payload));
    }
  };

  private handleTopicReceive = async (payload) => {
    if (this.isSuccess(payload)) {
      this._emit(socketNewTopicReceive(payload));
    }
  };

  public watchActions = () => {
    switch (this._account.role) {
      case AccountRole.USER:
        this._io.on(`message_received_${this._account.id}`, this.handleMessageReceive);
        break;
      case AccountRole.ADMIN:
        this._io.on('message_received_admin', this.handleMessageReceive);
        this._io.on('topic_received_admin', this.handleTopicReceive);
        break;
      default:
        break;
    }
  };
}

import { PayloadName } from '@redux/reducer';
import { sendMessageSuccess } from '@redux/slices/socketSlice';
import { socketTopicMessagesReceive } from '@redux/slices/topicSlice';
import { Message } from '@type/message';
import { SocketSendMessageDto } from '@type/socket';
import Constant from '@utils/constant';
import Helper from '@utils/helper';
import { toast } from 'react-toastify';
import { Socket } from 'socket.io-client';

export type SendMessageStartAction = Record<PayloadName, SocketSendMessageDto>;
export type SendMessageSuccessAction = Record<PayloadName, Message>;

export class SocketActions {
  // instance of socket
  private _io: Socket;

  // id of user
  private _userId: number;

  // passing argument in constructor
  constructor(io: Socket, _userId: number) {
    this._io = io;
    this._userId = _userId;
  }

  private isSuccess = (payload: any) => {
    if (payload?.error) {
      toast.warn(payload?.message);
      return false;
    }
    return true;
  };

  public watchActions = async (emit) => {
    this._io.on(`message_received_${this._userId}`, async (payload: Message) => {
      if (this.isSuccess(payload)) {
        await Helper.delay(Constant.delaySocket);
        emit(sendMessageSuccess());
        emit(socketTopicMessagesReceive(payload));
      }
    });
  };
}

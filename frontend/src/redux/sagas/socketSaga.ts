/* eslint-disable no-console */
import { SocketActions } from '@redux/actions/socketAction';
import { getAccountSlice, getAccountSuccess } from '@redux/slices/accountSlice';
import { getAuthSlice, logoutSuccess } from '@redux/slices/authSlice';
import { initSocketStart, sendMessageStart } from '@redux/slices/socketSlice';
import { addTopicSuccess } from '@redux/slices/topicSlice';
import { AccountSlice } from '@type/account';
import { AuthSlice } from '@type/auth';
import { eventChannel } from 'redux-saga';
import { call, cancel, fork, put, select, take, takeEvery } from 'redux-saga/effects';
import { io, Socket } from 'socket.io-client';

function connect(token: string) {
  const url = 'http://localhost:8001';
  const socket = io(url, { query: { token: token }, transports: ['websocket', 'polling'] });
  return new Promise((resolve) => {
    socket.on('connect', () => {
      console.log(`==========> CONNECT SOCKET SUCCESS: ${socket.id}`);
      resolve(socket);
    });
  });
}

//handle send message
function* watchSendMessage(socket: Socket) {
  while (true) {
    const { payload } = yield take(sendMessageStart);
    socket.emit('send_message', payload);
  }
}

function* handleEmitSocket(socket: Socket) {
  yield fork(watchSendMessage, socket);
}

function createSocketChanel({ socket, account }) {
  // `eventChannel` takes a subscriber function
  // the subscriber function takes an `emit` argument to put messages onto the channel
  return eventChannel((emit) => {
    const socketActions = new SocketActions(socket, emit, account);
    socketActions.watchActions();

    const pingHandler = (event) => {
      // puts event payload into the channel
      // this allows a Saga to take this payload from the returned channel
      emit(event.payload);
    };

    const errorHandler = (errorEvent) => {
      // create an Error object and put it into the channel
      emit(new Error(errorEvent.reason));
    };

    // setup the subscription
    socket.on('ping', pingHandler);
    socket.on('error', errorHandler);

    // the subscriber must return an unsubscribe function
    // this will be invoked when the saga calls `channel.close` method
    const unsubscribe = () => {
      socket.off('ping', pingHandler);
    };

    return unsubscribe;
  });
}

function* flowSocket() {
  const { token } = (yield select(getAuthSlice)) as AuthSlice;
  const socket: Socket = yield connect(token as string);
  const { account } = (yield select(getAccountSlice)) as AccountSlice;

  // socket.emit => send socket to server
  yield fork(handleEmitSocket, socket);
  // socket.on => receive data
  const socketChannel = yield call(createSocketChanel, { socket, account });

  while (true) {
    // get action by emitter and put receive action
    const actionByEmitter = yield take(socketChannel);
    yield put(actionByEmitter);
  }
  //   const task = yield fork(handleEmitSocket, socket);
  //   // take logout and cancel task
  //   yield take(logoutSuccess);
  //   yield cancel(task);
}

//flow
function* watchSocket() {
  // get token from state reducer
  const { token } = (yield select(getAuthSlice)) as AuthSlice;
  // wait get account success
  yield take(getAccountSuccess);
  // get account from state reducer
  const { account } = (yield select(getAccountSlice)) as AccountSlice;
  if (token && !!account?.id) {
    yield call(flowSocket);
  }
}

//root handle
export default function* socketSaga() {
  yield takeEvery(initSocketStart, watchSocket);
}

import {
  AddTopicStartAction,
  GetMyTopicsStartAction,
  GetTopicDetailStartAction,
  GetTopicMessagesStartAction,
} from '@redux/actions/topicAction';
import {
  addTopicError,
  addTopicStart,
  addTopicSuccess,
  getMyTopicsError,
  getMyTopicsStart,
  getMyTopicsSuccess,
  getSystemTopicsError,
  getSystemTopicsStart,
  getSystemTopicsSuccess,
  getTopicDetailError,
  getTopicDetailStart,
  getTopicDetailSuccess,
  getTopicMessagesError,
  getTopicMessagesStart,
  getTopicMessagesSuccess,
} from '@redux/slices/topicSlice';
import { TopicRequest } from '@request/topicRequest';
import Constant from '@utils/constant';
import Helper from '@utils/helper';
import { delay, put, takeLatest } from 'redux-saga/effects';

function* watchAddTopic({ payload }: AddTopicStartAction) {
  try {
    const response = yield TopicRequest.addTopic(payload);
    yield delay(Constant.delayAPI);
    if (Helper.isOkResponse(response)) {
      yield put(addTopicSuccess(response.data));
    } else {
      yield put(addTopicError(response));
    }
  } catch (error: any) {
    yield put(addTopicError(null as any));
  }
}

function* watchGetMyTopics({ payload }: GetMyTopicsStartAction) {
  try {
    const response = yield TopicRequest.getMyTopics(payload);
    yield delay(Constant.delayAPI);
    if (Helper.isOkResponse(response)) {
      yield put(getSystemTopicsSuccess(response.data));
    } else {
      yield put(getSystemTopicsError(response));
    }
  } catch (error: any) {
    yield put(getSystemTopicsError(null as any));
  }
}

function* watchGetSystemTopics({ payload }: GetMyTopicsStartAction) {
  try {
    const response = yield TopicRequest.getSystemTopics(payload);
    yield delay(Constant.delayAPI);
    if (Helper.isOkResponse(response)) {
      yield put(getMyTopicsSuccess(response.data));
    } else {
      yield put(getMyTopicsError(response));
    }
  } catch (error: any) {
    yield put(getMyTopicsError(null as any));
  }
}

function* watchGetTopicDetail({ payload }: GetTopicDetailStartAction) {
  try {
    const response = yield TopicRequest.getTopicDetail(payload.topicId, payload.query);
    yield delay(Constant.delayAPI);
    if (Helper.isOkResponse(response)) {
      yield put(getTopicDetailSuccess(response.data));
    } else {
      yield put(getTopicDetailError(response));
    }
  } catch (error: any) {
    yield put(getTopicDetailError(null as any));
  }
}

function* watchGetTopicMessages({ payload }: GetTopicMessagesStartAction) {
  try {
    const response = yield TopicRequest.getTopicMessages(payload);
    yield delay(Constant.delayAPI);
    if (Helper.isOkResponse(response)) {
      yield put(getTopicMessagesSuccess(response.data));
    } else {
      yield put(getTopicMessagesError(response));
    }
  } catch (error: any) {
    yield put(getTopicMessagesError(null as any));
  }
}

export default function* topicSaga(): any {
  yield takeLatest(addTopicStart, watchAddTopic);
  yield takeLatest(getMyTopicsStart, watchGetMyTopics);
  yield takeLatest(getSystemTopicsStart, watchGetSystemTopics);
  yield takeLatest(getTopicDetailStart, watchGetTopicDetail);
  yield takeLatest(getTopicMessagesStart, watchGetTopicMessages);
}

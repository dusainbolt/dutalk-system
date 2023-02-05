import { AddTopicStartAction, GetMyTopicsStartAction, GetTopicDetailStartAction } from '@redux/actions/topicAction';
import {
  addTopicError,
  addTopicStart,
  addTopicSuccess,
  getMyTopicsError,
  getMyTopicsStart,
  getMyTopicsSuccess,
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
    const response = yield TopicRequest.getTopicDetail(payload);
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

function* watchGetTopicMessages({ payload }: GetTopicDetailStartAction) {
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
  yield takeLatest(getTopicDetailStart, watchGetTopicDetail);
  yield takeLatest(getTopicMessagesStart, watchGetTopicMessages);
}

import { AddTopicStartAction, GetMyTopicsStartAction } from '@redux/actions/topicAction';
import {
  addTopicError,
  addTopicStart,
  addTopicSuccess,
  getMyTopicsError,
  getMyTopicsStart,
  getMyTopicsSuccess,
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

export default function* topicSaga(): any {
  yield takeLatest(addTopicStart, watchAddTopic);
  yield takeLatest(getMyTopicsStart, watchGetMyTopics);
}

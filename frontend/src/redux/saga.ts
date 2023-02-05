import { all } from 'redux-saga/effects';
import accountSaga from './sagas/accountSaga';
import authSaga from './sagas/authSaga';
import socketSaga from './sagas/socketSaga';
import topicSaga from './sagas/topicSaga';

export default function* rootSaga(): any {
  yield all([authSaga(), accountSaga(), topicSaga(), socketSaga()]);
}

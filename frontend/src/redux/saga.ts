import { all } from 'redux-saga/effects';
import accountSaga from './sagas/accountSaga';
import authSaga from './sagas/authSaga';
import topicSaga from './sagas/topicSaga';

export default function* rootSaga(): any {
  yield all([authSaga(), accountSaga(), topicSaga()]);
}

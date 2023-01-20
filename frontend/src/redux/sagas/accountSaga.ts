import { getAccountError, getAccountStart, getAccountSuccess } from '@redux/slices/accountSlice';
import { AccountRequest } from '@request/accountRequest';
import Constant from '@utils/constant';
import Helper from '@utils/helper';
import { delay, put, takeLatest } from 'redux-saga/effects';

function* watchGetAccount() {
  try {
    const response = yield AccountRequest.getAccount();
    yield delay(Constant.delayAPI);
    if (Helper.isOkResponse(response)) {
      yield put(getAccountSuccess(response.data?.account));
    } else {
      yield put(getAccountError(response));
    }
  } catch (error: any) {
    yield put(getAccountError(null as any));
  }
}

export default function* accountSaga(): any {
  yield takeLatest(getAccountStart, watchGetAccount);
}

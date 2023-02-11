/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import { GetAccountSuccessAction } from '@redux/actions/accountAction';
import { getPersistConfig } from '@redux/storage';
import { createAction, createSlice } from '@reduxjs/toolkit';
import { AccountSlice } from '@type/account';
import { ErrorAction } from '@type/context';
import { HYDRATE } from 'next-redux-wrapper';
import { persistReducer } from 'redux-persist';
import { RootState } from '../reducer';
import { AppState } from '../store';

const initialState: AccountSlice = {};

const hydrate = createAction<AppState>(HYDRATE);

const sliceName = 'accountSlice';

const accountSlice = createSlice({
  name: sliceName,
  initialState,
  reducers: {
    // getAccount dispatch
    getAccountStart: (state: AccountSlice) => {
      state.loadingAccount = true;
    },
    getAccountSuccess: (state: AccountSlice, { payload }: GetAccountSuccessAction) => {
      state.loadingAccount = false;
      state.isLoadedAccount = true;
      state.account = payload;
    },
    getAccountError: (state: AccountSlice, { payload }: ErrorAction) => {
      state.loadingAccount = false;
      state.errorGetAccount = payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(hydrate, (state, action) => {
      return {
        ...state,
        ...action.payload[sliceName],
      };
    });
  },
});

export const getAccountSlice = (state: RootState): AccountSlice => state[sliceName];

export const { getAccountStart, getAccountSuccess, getAccountError } = accountSlice.actions;

export default persistReducer(getPersistConfig(sliceName, { whitelist: ['account'] }), accountSlice.reducer);

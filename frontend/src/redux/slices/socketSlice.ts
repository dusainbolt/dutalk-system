/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import { SendMessageStartAction } from '@redux/actions/socketAction';
import { getPersistConfig } from '@redux/storage';
import { createAction, createSlice } from '@reduxjs/toolkit';
import { SocketSlice } from '@type/socket';
import { HYDRATE } from 'next-redux-wrapper';
import { persistReducer } from 'redux-persist';
import { RootState } from '../reducer';
import { AppState } from '../store';

const initialState: SocketSlice = {};

const hydrate = createAction<AppState>(HYDRATE);

const sliceName = 'socketSlice';

const socketSlice = createSlice({
  name: sliceName,
  initialState,
  reducers: {
    // init socket dispatch
    initSocketStart: (state: SocketSlice) => {
      return state;
    },

    // send message dispatch
    sendMessageStart: (state: SocketSlice, { payload }: SendMessageStartAction) => {
      state.isLoadingSendMessage = !!payload.topicId;
    },
    sendMessageSuccess: (state: SocketSlice) => {
      state.isLoadingSendMessage = false;
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

export const getSocketSlice = (state: RootState): SocketSlice => state[sliceName];

export const { initSocketStart, sendMessageStart, sendMessageSuccess } = socketSlice.actions;

export default persistReducer(getPersistConfig(sliceName, { whitelist: [''] }), socketSlice.reducer);

/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import {
  AddTopicStartAction,
  AddTopicSuccessAction,
  GetMyTopicsStartAction,
  GetMyTopicsSuccessAction,
} from '@redux/actions/topicAction';
import { getPersistConfig } from '@redux/storage';
import { createAction, createSlice } from '@reduxjs/toolkit';
import { ErrorAction } from '@type/context';
import { TopicSlice } from '@type/topic';
import { HYDRATE } from 'next-redux-wrapper';
import { persistReducer } from 'redux-persist';
import { RootState } from '../reducer';
import { AppState } from '../store';

const initialState: TopicSlice = {};

const hydrate = createAction<AppState>(HYDRATE);

const sliceName = 'topicSlice';

const topicSlice = createSlice({
  name: sliceName,
  initialState,
  reducers: {
    // add topic dispatch
    addTopicStart: (state: TopicSlice, { payload }: AddTopicStartAction) => {
      state.loadingAddTopic = !!payload.title;
    },
    addTopicSuccess: (state: TopicSlice, { payload }: AddTopicSuccessAction) => {
      state.loadingAddTopic = false;
      state.newTopicId = payload.id;
      state.errorAddTopic = undefined;
    },
    addTopicError: (state: TopicSlice, { payload }: ErrorAction) => {
      state.loadingAddTopic = false;
      state.errorAddTopic = payload;
    },

    // get topic dispatch
    getMyTopicsStart: (state: TopicSlice, { payload }: GetMyTopicsStartAction) => {
      state.loadingGetTopics = true;
    },
    getMyTopicsSuccess: (state: TopicSlice, { payload }: GetMyTopicsSuccessAction) => {
      state.loadingGetTopics = false;
      state.errorGetTopics = undefined;
      state.listTopics = payload;
    },
    getMyTopicsError: (state: TopicSlice, { payload }: ErrorAction) => {
      state.loadingGetTopics = false;
      state.errorGetTopics = payload;
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

export const getTopicSlice = (state: RootState): TopicSlice => state[sliceName];

export const { addTopicStart, addTopicSuccess, addTopicError, getMyTopicsStart, getMyTopicsSuccess, getMyTopicsError } =
  topicSlice.actions;

export default persistReducer(getPersistConfig(sliceName, { whitelist: [''] }), topicSlice.reducer);

/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import {
  AddTopicStartAction,
  AddTopicSuccessAction,
  GetMyTopicsStartAction,
  GetMyTopicsSuccessAction,
  GetTopicDetailStartAction,
  GetTopicDetailSuccessAction,
  GetTopicMessagesStartAction,
  GetTopicMessagesSuccessAction,
  SocketTopicMessagesReceiveAction,
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

    // get topics dispatch
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

    // get topic detail dispatch
    getTopicDetailStart: (state: TopicSlice, { payload }: GetTopicDetailStartAction) => {
      state.loadingGetTopic = !!payload.topicId;
    },
    getTopicDetailSuccess: (state: TopicSlice, { payload }: GetTopicDetailSuccessAction) => {
      state.loadingGetTopic = false;
      state.errorGetTopic = undefined;
      state.topic = payload;
    },
    getTopicDetailError: (state: TopicSlice, { payload }: ErrorAction) => {
      state.loadingGetTopic = false;
      state.errorGetTopic = payload;
    },

    // get topic messages dispatch
    getTopicMessagesStart: (state: TopicSlice, { payload }: GetTopicMessagesStartAction) => {
      state.loadingGetTopicMessages = !!payload.topicId;
    },
    getTopicMessagesSuccess: (state: TopicSlice, { payload }: GetTopicMessagesSuccessAction) => {
      state.loadingGetTopicMessages = false;
      state.errorGetTopicMessages = undefined;
      state.topicMessages = payload;
    },
    getTopicMessagesError: (state: TopicSlice, { payload }: ErrorAction) => {
      state.loadingGetTopicMessages = false;
      state.errorGetTopicMessages = payload;
    },

    // receive emit socket message
    socketTopicMessagesReceive: (state: TopicSlice, { payload }: SocketTopicMessagesReceiveAction) => {
      // is same topic of topic messages
      if (state.topicMessages?.length && state.topicMessages[0].topicId === payload.topicId) {
        state.topicMessages?.push(payload);
      }
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

export const {
  addTopicStart,
  addTopicSuccess,
  addTopicError,
  getMyTopicsStart,
  getMyTopicsSuccess,
  getMyTopicsError,
  getTopicDetailStart,
  getTopicDetailSuccess,
  getTopicDetailError,
  getTopicMessagesStart,
  getTopicMessagesSuccess,
  getTopicMessagesError,
  socketTopicMessagesReceive,
} = topicSlice.actions;

export default persistReducer(getPersistConfig(sliceName, { whitelist: [''] }), topicSlice.reducer);

/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import {
  AddTopicStartAction,
  AddTopicSuccessAction,
  GetMyTopicsStartAction,
  GetMyTopicsSuccessAction,
  GetSystemTopicsStartAction,
  GetSystemTopicsSuccessAction,
  GetTopicDetailStartAction,
  GetTopicDetailSuccessAction,
  GetTopicMessagesStartAction,
  GetTopicMessagesSuccessAction,
  SocketNewTopicReceiveAction,
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
    // eslint-disable-next-line no-empty-pattern
    getMyTopicsStart: (state: TopicSlice, {}: GetMyTopicsStartAction) => {
      state.loadingGetTopics = true;
    },
    getMyTopicsSuccess: (state: TopicSlice, { payload }: GetMyTopicsSuccessAction) => {
      state.loadingGetTopics = false;
      state.errorGetTopics = undefined;
      state.listTopics = payload;
      state.loadedListTopic = true;
    },
    getMyTopicsError: (state: TopicSlice, { payload }: ErrorAction) => {
      state.loadingGetTopics = false;
      state.errorGetTopics = payload;
      state.loadedListTopic = true;
    },

    // get topics on system dispatch
    // eslint-disable-next-line no-empty-pattern
    getSystemTopicsStart: (state: TopicSlice, {}: GetSystemTopicsStartAction) => {
      state.loadingGetTopics = true;
    },
    getSystemTopicsSuccess: (state: TopicSlice, { payload }: GetSystemTopicsSuccessAction) => {
      state.loadingGetTopics = false;
      state.errorGetTopics = undefined;
      state.listTopics = payload;
      state.loadedListTopic = true;
    },
    getSystemTopicsError: (state: TopicSlice, { payload }: ErrorAction) => {
      state.loadingGetTopics = false;
      state.errorGetTopics = payload;
      state.loadedListTopic = true;
    },

    // get topic detail dispatch
    getTopicDetailStart: (state: TopicSlice, { payload }: GetTopicDetailStartAction) => {
      state.loadingGetTopic = !!payload.topicId;
      // check reset message when switch new topic
      if (state.topicMessages && state.topicMessages.length) {
        if (state.topicMessages[0]?.topicId?.toString() !== payload.topicId) {
          state.topicMessages = [];
        }
      }
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
      state.loadingLoadMoreTopicMessages = payload.query?.latestMessageId ? true : undefined;
    },
    getTopicMessagesSuccess: (state: TopicSlice, { payload }: GetTopicMessagesSuccessAction) => {
      state.loadingGetTopicMessages = false;
      state.errorGetTopicMessages = undefined;
      state.loadingLoadMoreTopicMessages =
        typeof state.loadingLoadMoreTopicMessages === 'undefined' ? undefined : false;
      if (payload && payload?.length) {
        state.topicMessages = state.topicMessages ? payload.reverse().concat(state.topicMessages) : payload.reverse();
      }
    },
    getTopicMessagesError: (state: TopicSlice, { payload }: ErrorAction) => {
      state.loadingGetTopicMessages = false;
      state.errorGetTopicMessages = payload;
    },

    // receive emit socket message
    socketTopicMessagesReceive: (state: TopicSlice, { payload }: SocketTopicMessagesReceiveAction) => {
      // is same topic of topic messages
      if (state.topicMessages?.length && state.topicMessages[0].topicId === payload.topic.id) {
        state.topicMessages?.push(payload.message);
      }
      // update new data of topic
      const indexTopic: any = state.listTopics?.findIndex((item) => item.id === payload.topic.id);
      if (indexTopic !== -1) {
        const oldTopic = (state as any)?.listTopics[indexTopic];
        state.listTopics?.splice(indexTopic as number, 1);
        state.listTopics?.unshift({ ...oldTopic, ...payload.topic, latestMessage: payload.message });
      }
    },

    socketNewTopicReceive: (state: TopicSlice, { payload }: SocketNewTopicReceiveAction) => {
      state.listTopics?.unshift(payload);
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
  getSystemTopicsStart,
  getSystemTopicsSuccess,
  getSystemTopicsError,
  getTopicDetailStart,
  getTopicDetailSuccess,
  getTopicDetailError,
  getTopicMessagesStart,
  getTopicMessagesSuccess,
  getTopicMessagesError,
  socketTopicMessagesReceive,
  socketNewTopicReceive,
} = topicSlice.actions;

export default persistReducer(getPersistConfig(sliceName, { whitelist: [''] }), topicSlice.reducer);

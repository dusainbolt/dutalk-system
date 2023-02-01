import { combineReducers } from '@reduxjs/toolkit';
import accountSlice from './slices/accountSlice';
import authSlice from './slices/authSlice';
import layoutSlice from './slices/layoutSlice';
import topicSlice from './slices/topicSlice';

export const whitelist = [];

export const rootReducer = combineReducers({
  layoutSlice,
  authSlice,
  accountSlice,
  topicSlice,
});

export type RootState = ReturnType<typeof rootReducer>;

export type PayloadName = 'payload';

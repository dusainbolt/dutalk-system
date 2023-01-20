import { combineReducers } from '@reduxjs/toolkit';
import accountSlice from './slices/accountSlice';
import authSlice from './slices/authSlice';
import layoutSlice from './slices/layoutSlice';

export const whitelist = [];

export const rootReducer = combineReducers({
  layoutSlice,
  authSlice,
  accountSlice,
});

export type RootState = ReturnType<typeof rootReducer>;

export type PayloadName = 'payload';

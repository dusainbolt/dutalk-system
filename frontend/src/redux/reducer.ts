import { combineReducers } from '@reduxjs/toolkit';
import authSlice from './slices/authSlice';
import layoutSlice from './slices/layoutSlice';

export const whitelist = [];

export const rootReducer = combineReducers({
  authSlice,
  layoutSlice,
});

export type RootState = ReturnType<typeof rootReducer>;

export type PayloadName = 'payload';

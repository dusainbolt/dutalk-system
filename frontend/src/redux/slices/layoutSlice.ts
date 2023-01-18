/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import { OpenDialogAction } from '@redux/actions/layoutAction';
import { RootState } from '@redux/reducer';
import { getPersistConfig } from '@redux/storage';
import { AppState } from '@redux/store';
import { createAction, createSlice } from '@reduxjs/toolkit';
import { LayoutSlice } from '@type/layout';
import { HYDRATE } from 'next-redux-wrapper';
import { persistReducer } from 'redux-persist';

const initialState: LayoutSlice = {};

const hydrate = createAction<AppState>(HYDRATE);

const sliceName = 'layoutSlice';

const layoutSlice = createSlice({
  name: sliceName,
  initialState,
  reducers: {
    openDialogApp: (state: LayoutSlice, { payload }: OpenDialogAction) => {
      state.dialog = payload;
      state.dialog.open = true;
    },
    closeDialogApp: (state: LayoutSlice) => {
      state.dialog = {};
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

export const getLayoutSlice = (state: RootState): LayoutSlice => state[sliceName];

export const { openDialogApp, closeDialogApp } = layoutSlice.actions;

export default persistReducer(getPersistConfig(sliceName, { whitelist: ['themeMode'] }), layoutSlice.reducer);

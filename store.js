import { createSlice, configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";

const initialState = {
  heartBeat: false,
  isRunning: false,
  lastFetched: null,
};

export const heartBeatSlice = createSlice({
  name: "heartBeat",
  initialState,
  reducers: {
    setHeartBeat: (state, action) => {
      const { payload } = action;
      state.heartBeat = payload.heartBeat;
      state.isRunning = payload.isRunning;
      state.lastFetched = payload.lastFetched ?? null;
    },
  },
});

export const { setHeartBeat } = heartBeatSlice.actions;
const store = configureStore({
  reducer: {
    heartBeat: heartBeatSlice.reducer,
  },
});

export default store;

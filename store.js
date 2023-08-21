import { createSlice, configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";

const initialState = {
  heartBeat: false,
  isRunning: false
};

export const heartBeatSlice = createSlice({
  name: "heartBeat",
  initialState,
  reducers: {
    setHeartBeat: (state, action) => {
      const { payload } = action;
      state.heartBeat = payload.heartBeat;
      state.isRunning = payload.isRunning;
    },
  },
});

export const { setHeartBeat } = heartBeatSlice.actions;

// const AppReducers = combineReducers({
//   heartBeat: heartBeatSlice.reducer,
// });

const store = configureStore({
  reducer: {
    heartBeat: heartBeatSlice.reducer,
  },
});

export default store;

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isRunning: false,
};

export const heartbeatServiceSlice = createSlice({
  name: "heartBeat",
  initialState,
  reducers: {
    startHeartbeatService: (state, action) => {
      const { payload } = action;
      state.isRunning = payload.isRunning;
    },
  },
});

export const { startHeartbeatService } = heartbeatServiceSlice.actions;
export default heartbeatServiceSlice.reducer;

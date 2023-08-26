import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    screen: null,
    data: {}
};

export const notificationSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setNotification: (state, action) => {
      const { payload } = action;
      state.screen = payload.screen;
      state.data = payload.data;
    },
    removeNotification: (state) => {
      state.screen = null;
      state.data = {}
    },
  },
});

export const { setNotification, removeNotification } = notificationSlice.actions;

export default notificationSlice.reducer;

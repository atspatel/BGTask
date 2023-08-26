import { combineReducers } from "redux";
import authReducer from "reducers/authSlice";
import notificationReducer from "reducers/notificationSlice";
import heartbeatServiceReducer from "reducers/heartbeatServiceSlice";

const AppReducers = combineReducers({
  auth: authReducer,
  notification: notificationReducer,
  heartbeatService: heartbeatServiceReducer,
});

export default AppReducers;

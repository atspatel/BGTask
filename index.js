import { registerRootComponent } from "expo";

// import App from "./App";

import { AppRegistry } from "react-native";
import React from "react";
import { Provider } from "react-redux";
import App from "./App";
// import { name as appName } from "./app.json";
import store, { setHeartBeat } from "./store";

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately

const MyHeadlessTask = async () => {
  console.log("Receiving HeartBeat!");
  // store.dispatch(setHeartBeat(true));
  // setTimeout(() => {
  //   store.dispatch(setHeartBeat(false));
  // }, 1000);
};

const RNRedux = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

AppRegistry.registerHeadlessTask("Heartbeat", () => MyHeadlessTask);
registerRootComponent(RNRedux);

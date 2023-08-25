import { registerRootComponent } from "expo";
import * as Notifications from "expo-notifications";

import { AppRegistry } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import React from "react";
import { Provider } from "react-redux";
import App from "./App";
import store, { setHeartBeat } from "./store";

import { readSampleData } from "./useHeartRateDataAndroid";
import PushNotification from "./PushNotifiction";

function subtractMinutes(date, minutes) {
  date.setMinutes(date.getMinutes() - minutes);
  return date;
}

const MyHeadlessTask = async () => {
  console.log("Receiving HeartBeat!", new Date());
  let lastFetched = AsyncStorage.getItem("@bgTask:lastFetched");
  const startTime = subtractMinutes(new Date(), 30);
  const endTime = new Date();
  console.log(startTime.toLocaleString(), endTime.toLocaleString(), "------");
  const { heartRateData, restingHeartRateData } = await readSampleData(
    startTime,
    endTime
  );

  let updatedLastFetched = lastFetched;
  let lastBeatsPerMinute;

  let description = null;
  heartRateData.map((item) => {
    const { time, beatsPerMinute } = item.samples[0];
    console.log(time, beatsPerMinute, "time, beats");
    updatedLastFetched = time;
    lastBeatsPerMinute = beatsPerMinute;

    const notificationLine = `${new Date(
      updatedLastFetched
    ).toLocaleTimeString()} :: ${beatsPerMinute}`;
    description = description
      ? `${description}\n${notificationLine}`
      : notificationLine;
  });
  lastBeatsPerMinute
    ? Notifications.scheduleNotificationAsync({
        content: {
          title: `interval: ${startTime.toLocaleTimeString()} to ${endTime.toLocaleTimeString()}`,
          body: description,
        },
        trigger: null,
      })
    : null;
  try {
    await AsyncStorage.setItem("@bgTask:lastFetched", updatedLastFetched);
  } catch (error) {}
};

const RNRedux = () => (
  <Provider store={store}>
    <PushNotification />
    <App />
  </Provider>
);

AppRegistry.registerHeadlessTask("Heartbeat", () => MyHeadlessTask);
registerRootComponent(RNRedux);

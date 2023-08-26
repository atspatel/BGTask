import { registerRootComponent } from "expo";
import * as Notifications from "expo-notifications";

import { AppRegistry } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "reducers/store";

import App from "./App";
import { readSampleData } from "./useHeartRateDataAndroid";

const KEY_LAST_NOTIFICATION_TIME = "@bgTask:lastNotificationTime";

function addMinutes(date, minutes) {
  date.setMinutes(date.getMinutes() + minutes);
  return date;
}

async function popNotification(id, time, beatsPerMinute) {
  const measureTime = new Date(time).toLocaleString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
  const title = "You've got a trigger!";
  const description = `Your heart rate was ${beatsPerMinute} bpm, measured at ${measureTime}`;
  await Notifications.scheduleNotificationAsync({
    content: {
      title: title,
      body: description,
    },
    trigger: null,
  });
  try {
    await AsyncStorage.setItem(KEY_LAST_NOTIFICATION_TIME, time);
  } catch (error) {}
  return true;
}

const MyHeadlessTask = async () => {
  console.log("Receiving HeartBeat!", new Date());
  const startTime = addMinutes(new Date(), -1 * 2880);
  const endTime = new Date();
  const { heartRateData, restingHeartRateData } = await readSampleData(
    startTime,
    endTime
  );

  heartRateData.reverse().map(async (item) => {
    const { time, beatsPerMinute } = item.samples[0];
    if (beatsPerMinute > 100) {
      const id = item.metadata.id;
      let lastNotificationTime = await AsyncStorage.getItem(
        KEY_LAST_NOTIFICATION_TIME
      );
      if (
        lastNotificationTime === null ||
        new Date(time) > addMinutes(new Date(lastNotificationTime), 15)
      ) {
        popNotification(id, time, beatsPerMinute);
      }
    }
  });
};

const RNRedux = () => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>
);

AppRegistry.registerHeadlessTask("Heartbeat", () => MyHeadlessTask);
registerRootComponent(RNRedux);

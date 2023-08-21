import React, { useEffect } from "react";
import { Text, View, ScrollView, Button } from "react-native";

import useHeartRateDataAndroid from "./useHeartRateDataAndroid";

import * as BackgroundFetch from "expo-background-fetch";
import * as TaskManager from "expo-task-manager";

const BACKGROUND_HEART_RATE_READ = "heart-rate-read";

TaskManager.defineTask(BACKGROUND_HEART_RATE_READ, async () => {
  const date = new Date();
  const timeRangeFilter = {
    operator: "between",
    startTime: new Date(date.setHours(0, 0, 0, 0)).toISOString(),
    endTime: new Date(date.setHours(23, 59, 59, 999)).toISOString(),
  };
  const heartRateData = await readRecords("HeartRate", { timeRangeFilter });
  return BackgroundFetch.BackgroundFetchResult.NewData;
});

async function registerBackgroundFetchAsync() {
  return BackgroundFetch.registerTaskAsync(BACKGROUND_FETCH_TASK, {
    minimumInterval: 60 * 10, // 15 minutes
    stopOnTerminate: false, // android only,
    startOnBoot: true, // android only
  });
}

async function unregisterBackgroundFetchAsync() {
  return BackgroundFetch.unregisterTaskAsync(BACKGROUND_FETCH_TASK);
}

function HeartRateDataComp(props) {
  const { heartRateData } = props;
  return (
    <View
      key={heartRateData.startDate}
      style={{ alignItems: "center", flexDirection: "row", gap: 20 }}
    >
      <Text>{heartRateData.startDate}</Text>
      <Text style={{ fontWeight: "bold" }}>
        {parseInt(heartRateData.value)}
      </Text>
    </View>
  );
}

function parseDate(date) {
  const d = new Date(date);
  return { date: d.toLocaleDateString(), time: d.toLocaleTimeString() };
}

const date = new Date();
const { date: pDate, time } = parseDate(date.toISOString());
export default function HeartRateDataAndroid(props) {
  const { date } = props;
  const { heartRate, restingHeartRate } = useHeartRateDataAndroid(date);

  const [isRegistered, setIsRegistered] = React.useState(false);
  const [status, setStatus] = React.useState(null);

  const checkStatusAsync = async () => {
    const status = await BackgroundFetch.getStatusAsync();
    const isRegistered = await TaskManager.isTaskRegisteredAsync(
      BACKGROUND_HEART_RATE_READ
    );
    setStatus(status);
    setIsRegistered(isRegistered);
  };

  const toggleFetchTask = async () => {
    if (isRegistered) {
      await unregisterBackgroundFetchAsync();
    } else {
      await registerBackgroundFetchAsync();
    }
    checkStatusAsync();
  };

  return (
    <View style={{ flex: 1, marginTop: 60, gap: 10 }}>
      <Button onPress={toggleFetchTask} title={`Registered: ${isRegistered}`} />
      <ScrollView contentContainerStyle={{ alignItems: "center", gap: 15 }}>
        <Text>
          {pDate} {time}
        </Text>
        {heartRate && (
          <View style={{ gap: 5 }}>
            {heartRate
              .slice(0)
              .reverse()
              .map((item, index) => {
                return item ? (
                  <HeartRateDataComp key={index} heartRateData={item.samples} />
                ) : null;
              })}
          </View>
        )}
      </ScrollView>
    </View>
  );
}

import React, { useEffect } from "react";
import { StyleSheet, Text, View, Button, ScrollView } from "react-native";
import * as BackgroundFetch from "expo-background-fetch";
import * as TaskManager from "expo-task-manager";

import useHeartRateDataAndroid from "./useHeartRateDataAndroid";
import useHeartRateDataIos from "./useHeartRateDataIos";

const BACKGROUND_FETCH_TASK = "background-fetch";

// 1. Define the task by providing a name and the function that should be executed
// Note: This needs to be called in the global scope (e.g outside of your React components)
TaskManager.defineTask(BACKGROUND_FETCH_TASK, async () => {
  const currentDate = new Date();

  // Be sure to return the successful result type!
  return BackgroundFetch.BackgroundFetchResult.NewData;
});

// 2. Register the task at some point in your app by providing the same name,
// and some configuration options for how the background fetch should behave
// Note: This does NOT need to be in the global scope and CAN be used in your React components!
async function registerBackgroundFetchAsync() {
  return BackgroundFetch.registerTaskAsync(BACKGROUND_FETCH_TASK, {
    minimumInterval: 60 * 15, // 15 minutes
    stopOnTerminate: false, // android only,
    startOnBoot: true, // android only
  });
}

// 3. (Optional) Unregister tasks by specifying the task name
// This will cancel any future background fetch calls that match the given name
// Note: This does NOT need to be in the global scope and CAN be used in your React components!
async function unregisterBackgroundFetchAsync() {
  return BackgroundFetch.unregisterTaskAsync(BACKGROUND_FETCH_TASK);
}

function parseDate(date) {
  const d = new Date(date);
  return { date: d.toLocaleDateString(), time: d.toLocaleTimeString() };
}

function HeartRateDataComp(props) {
  const { heartRateData } = props;
  return (
    <View>
      {heartRateData.map((data) => {
        const { date, time } = parseDate(data.time);
        return (
          <View
            key={data.time}
            style={{ alignItems: "center", flexDirection: "row", gap: 20 }}
          >
            <Text>{date}</Text>
            <Text>{time}</Text>
            <Text style={{ fontWeight: "bold" }}>{data.beatsPerMinute}</Text>
          </View>
        );
      })}
    </View>
  );
}
const date = new Date();
const { date: pDate, time } = parseDate(date.toISOString());
export default function App() {
  const [isRegistered, setIsRegistered] = React.useState(false);
  const [status, setStatus] = React.useState(null);
  //   const [heartRate, setHeartRate] = React.useState([]);

  //   React.useEffect(() => {
  //     checkStatusAsync();
  //   }, []);

  const checkStatusAsync = async () => {
    const status = await BackgroundFetch.getStatusAsync();
    const isRegistered = await TaskManager.isTaskRegisteredAsync(
      BACKGROUND_FETCH_TASK
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

  //   useEffect(() => {

  //     setHeartRate(heartRate);
  //   }, []);

  const { heartRate, restingHeartRate } = useHeartRateDataAndroid(date);

  //   console.log(date, "+++++");
  return (
    <View style={{ flex: 1, marginTop: 60 }}>
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

const styles = StyleSheet.create({
  screen: {
    marginTop: 330,
    width: "100%",
    backgroundColor: "green",
    // flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
  },
  textContainer: {
    margin: 10,
  },
  boldText: {
    fontWeight: "bold",
  },
});

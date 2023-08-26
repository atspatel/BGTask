import React, { useEffect } from "react";
import {
  StyleSheet,
  View,
  Platform,
  TouchableOpacity,
  Text,
} from "react-native";
import { useSelector } from "react-redux";
import { StatusBar } from "expo-status-bar";

import { store } from "reducers/store";

import Heartbeat from "./Heartbeat";
import HeartRateDataAndroid from "components/HeartRateDataAndroid";
import PushNotification from "components/notifications/PushNotification";
import { appColor } from "constants/theme";

import {} from "";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    alignItems: "center",
  },
  button: {
    padding: 10,
    width: 200,
    backgroundColor: "green",
    margin: 5,
    alignItems: "center",
    borderRadius: 10,
  },
});

function App() {
  const { isRunning } = useSelector((state) => {
    return state.heartbeatService;
  });

  function onClickStart() {
    store.dispatch(startHeartbeatService({ isRunning: true }));
    Heartbeat.stopService();
    Heartbeat.startService();
  }
  function onClickStop() {
    store.dispatch(startHeartbeatService({ isRunning: false }));
    Heartbeat.stopService();
  }

  return (
    <>
      <StatusBar style="dark" backgroundColor={appColor.statusBarColor} />
      <PushNotification />
      <View style={styles.container}>
        <View style={styles.view}>
          {isRunning ? (
            <TouchableOpacity style={styles.button} onPress={onClickStop}>
              <Text style={styles.instructions}>Stop</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={styles.button} onPress={onClickStart}>
              <Text style={styles.instructions}>Start</Text>
            </TouchableOpacity>
          )}
        </View>
        {Platform.OS === "android" && <HeartRateDataAndroid />}
      </View>
    </>
  );
}

export default App;

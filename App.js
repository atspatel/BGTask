import React, { useEffect } from "react";
import {
  StyleSheet,
  View,
  Platform,
  TouchableOpacity,
  Text,
} from "react-native";
import { useSelector } from "react-redux";
import Heartbeat from "./Heartbeat";
import HeartRateDataAndroid from "./HeartRateDataAndroid";

import { setHeartBeat } from "./store";

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
    return state.heartBeat;
  });

  function onClickStart() {
    setHeartBeat({ heartBeat: null, isRunning: true });
    Heartbeat.startService();
  }
  function onClickStop() {
    setHeartBeat({ heartBeat: null, isRunning: false });
    Heartbeat.stopService();
  }

  console.log(isRunning);
  return (
    <View style={styles.container}>
      <View style={styles.view}>
        {/* {isRunning ? ( */}
          <TouchableOpacity style={styles.button} onPress={onClickStop}>
            <Text style={styles.instructions}>Stop</Text>
          </TouchableOpacity>
        {/* ) : ( */}
          <TouchableOpacity style={styles.button} onPress={onClickStart}>
            <Text style={styles.instructions}>Start</Text>
          </TouchableOpacity>
        {/* )} */}
      </View>
      {Platform.OS === "android" && <HeartRateDataAndroid />}
    </View>
  );
}

export default App;

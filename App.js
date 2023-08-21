import React from "react";
import { StyleSheet, View, Platform } from "react-native";
import { useSelector } from "react-redux";
import Heartbeat from "./Heartbeat";
import HeartRateDataAndroid from "./HeartRateDataAndroid";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

const App = () => {
  const heartBeat = useSelector((state) => {
    return state.heartBeat.heartBeat;
  });
  const imageSize = heartBeat ? 150 : 100;
  return (
    <View style={styles.container}>
      {Platform.OS === "android" && <HeartRateDataAndroid />}
      {/* <View style={styles.view}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => Heartbeat.startService()}
        >
          <Text style={styles.instructions}>Start</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => Heartbeat.stopService()}
        >
          <Text style={styles.instructions}>Stop</Text>
        </TouchableOpacity>
      </View> */}
    </View>
  );
};

export default App;

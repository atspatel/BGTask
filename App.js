import React, { useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  ScrollView,
  Platform,
} from "react-native";

import useHeartRateDataAndroid from "./useHeartRateDataAndroid";
import useHeartRateDataIos from "./useHeartRateDataIos";

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

function HeartRateDataAndroid(props) {
  const { date } = props;
  const { heartRate, restingHeartRate } = useHeartRateDataAndroid(date);
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

function HeartRateDataIos(props) {
  const { date } = props;
  const { heartRate, restingHeartRate } = useHeartRateDataIos(date);

  console.log(heartRate, "------");
  return (
    <View style={{ flex: 1, marginTop: 60 }}>
      <ScrollView contentContainerStyle={{ alignItems: "center", gap: 15 }}>
        <Text>
          {pDate} {time}
        </Text>
        {/* {heartRate && (
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
        )} */}
      </ScrollView>
    </View>
  );
}

const date = new Date();
const { date: pDate, time } = parseDate(date.toISOString());
export default function App() {
  if (Platform.OS !== "android") {
    return <HeartRateDataAndroid date={date} />;
  }
  if (Platform.OS !== "ios") {
    return <HeartRateDataIos date={date} />;
  }
  return null;
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

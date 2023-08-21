import React, { useEffect } from "react";
import { Text, View, ScrollView, Button } from "react-native";

import readHealthConnectDataAndroid from "./readHealthConnectDataAndroid";

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

export default function HeartRateDataAndroid(props) {
  const date = new Date();
  const { date: pDate, time } = parseDate(date.toISOString());
  const { heartRate, restingHeartRate } = readHealthConnectDataAndroid(date);

  return (
    <View style={{ flex: 1, marginTop: 60, gap: 10 }}>
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

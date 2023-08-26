import React, { useEffect } from "react";
import { Text, View, ScrollView, Button } from "react-native";

import useHeartRateDataAndroid from "../../useHeartRateDataAndroid";

function HeartRateDataComp(props) {
  const { heartRateData } = props;
  return (
    <View
      key={heartRateData.startDate}
      style={{ alignItems: "center", flexDirection: "row", gap: 20 }}
    >
      <Text>{new Date(heartRateData.time).toLocaleString()}</Text>
      <Text style={{ fontWeight: "bold" }}>
        {parseInt(heartRateData.beatsPerMinute)}
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
export default function HeartRateDataAndroid() {
  const { heartRate, restingHeartRate } = useHeartRateDataAndroid();
  return (
    <View style={{ flex: 1, gap: 10 }}>
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
                  <HeartRateDataComp
                    key={index}
                    heartRateData={item.samples[0]}
                  />
                ) : null;
              })}
          </View>
        )}
      </ScrollView>
    </View>
  );
}

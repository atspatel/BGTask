import React, { useEffect, useState } from "react";
import { Platform } from "react-native";

import {
  initialize,
  requestPermission,
  readRecords,
} from "react-native-health-connect";

export async function readSampleData(startTime, endTime) {
  // const isInitialized = await initialize();
  // if (!isInitialized) {
  //   return;
  // }

  // // request permissions
  // await requestPermission([
  //   { accessType: "read", recordType: "Steps" },
  //   { accessType: "read", recordType: "HeartRate" },
  //   { accessType: "read", recordType: "RestingHeartRate" },
  // ]);

  const date = new Date();
  const sTime = startTime ?? new Date(date.setHours(0, 0, 0, 0));
  const eTime = endTime ?? new Date();

  const timeRangeFilter = {
    operator: "between",
    startTime: sTime.toISOString(),
    endTime: eTime.toISOString(),
  };

  const heartRateData = await readRecords("HeartRate", { timeRangeFilter });
  const restingHeartRateData = await readRecords("RestingHeartRate", {
    timeRangeFilter,
  });
  return { heartRateData, restingHeartRateData };
}

const useHeartRateDataAndroid = (startTime, endTime) => {
  const [heartRate, setHeartRate] = useState(null);
  const [restingHeartRate, setRestingHeartRate] = useState(null);

  // Android - Health Connect
  const readSampleData = async () => {
    const isInitialized = await initialize();
    if (!isInitialized) {
      return;
    }

    // request permissions
    await requestPermission([
      { accessType: "read", recordType: "Steps" },
      { accessType: "read", recordType: "HeartRate" },
      { accessType: "read", recordType: "RestingHeartRate" },
    ]);

    const date = new Date();
    const sTime = startTime ?? new Date(date.setHours(0, 0, 0, 0));
    const eTime = endTime ?? new Date();

    const timeRangeFilter = {
      operator: "between",
      startTime: sTime.toISOString(),
      endTime: eTime.toISOString(),
    };

    // HeartRate
    const heartRateData = await readRecords("HeartRate", { timeRangeFilter });
    setHeartRate(heartRateData);

    // Distance
    const restingHeartRateData = await readRecords("RestingHeartRate", {
      timeRangeFilter,
    });
    setRestingHeartRate(restingHeartRateData);
  };

  useEffect(() => {
    if (Platform.OS !== "android") {
      return;
    }
    readSampleData();
  }, [startTime, endTime]);

  return {
    heartRate,
    restingHeartRate,
  };
};

export default useHeartRateDataAndroid;

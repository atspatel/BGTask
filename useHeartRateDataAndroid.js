import React, { useEffect, useState } from "react";
import { Platform } from "react-native";

import {
  initialize,
  requestPermission,
  readRecords,
} from "react-native-health-connect";

const useHeartRateDataAndroid = (date) => {
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

    const timeRangeFilter = {
      operator: "between",
      startTime: new Date(date.setHours(0, 0, 0, 0)).toISOString(),
      endTime: new Date(date.setHours(23, 59, 59, 999)).toISOString(),
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
  }, [date]);

  return {
    heartRate,
    restingHeartRate,
  };
};

export default useHeartRateDataAndroid;

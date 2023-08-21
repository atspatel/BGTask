import { Platform } from "react-native";
import {
  initialize,
  requestPermission,
  readRecords,
} from "react-native-health-connect";

export default async function readHealthConnectDataAndroid(date) {
  if (Platform.OS !== "android") {
    return;
  }

  const isInitialized = await initialize();
  if (!isInitialized) {
    return;
  }

  // request permissions
  await requestPermission([
    { accessType: "read", recordType: "HeartRate" },
    { accessType: "read", recordType: "RestingHeartRate" },
  ]);

  const timeRangeFilter = {
    operator: "between",
    startTime: new Date(date.setHours(0, 0, 0, 0)).toISOString(),
    endTime: new Date(date.setHours(23, 59, 59, 999)).toISOString(),
  };

  const heartRateData = await readRecords("HeartRate", { timeRangeFilter });
  const restingHeartRateData = await readRecords("RestingHeartRate", {
    timeRangeFilter,
  });
  return {
    heartRateData,
    restingHeartRateData,
  };
}

import AppleHealthKit from "react-native-health";
import { useEffect, useState } from "react";

const permissions = {
  permissions: {
    read: [
      AppleHealthKit.Constants.Permissions.HeartRate,
      AppleHealthKit.Constants.Permissions.RestingHeartRate,
    ],
    write: [],
  },
};

const useHeartRateDataIos = (date) => {
  const [hasPermissions, setHasPermission] = useState(false);

  const [heartRate, setHeartRate] = useState(null);
  const [restingHeartRate, setRestingHeartRate] = useState(null);

  // iOS - HealthKit
  useEffect(() => {
    if (Platform.OS !== "ios") {
      return;
    }

    AppleHealthKit.isAvailable((err, isAvailable) => {
      if (err) {
        console.log("Error checking availability");
        return;
      }
      if (!isAvailable) {
        console.log("Apple Health not available");
        return;
      }
      AppleHealthKit.initHealthKit(permissions, (err) => {
        if (err) {
          console.log("Error getting permissions");
          return;
        }
        setHasPermission(true);
      });
    });
  }, []);

  useEffect(() => {
    if (!hasPermissions) {
      return;
    }

    const options = {
      date: date.toISOString(),
      includeManuallyAdded: false,
    };

    AppleHealthKit.getHeartRateSamples(options, (err, results) => {
      if (err) {
        console.log("Error getting the steps");
        return;
      }
      setHeartRate(results);
    });

    AppleHealthKit.getRestingHeartRateSamples(options, (err, results) => {
      if (err) {
        console.log("Error getting the steps:", err);
        return;
      }
      setRestingHeartRate(results);
    });
  }, [hasPermissions, date]);

  return {
    heartRate,
    restingHeartRate,
  };
};

export default useHeartRateDataIos;

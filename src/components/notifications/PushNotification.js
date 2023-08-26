import { useState, useEffect, useRef } from "react";
import { Text, View, Button, Platform } from "react-native";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import Constants from "expo-constants";

import { useSelector, useDispatch } from "react-redux";
import { useNavigation, StackActions } from "@react-navigation/native";

import { setNotificationToken } from "./api";
import { setNotification } from "reducers/notificationSlice";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

async function registerForPushNotificationsAsync() {
  let token;
  if (Device.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      alert("Failed to get push token for push notification!");
      return;
    }
    token = (
      await Notifications.getExpoPushTokenAsync({
        projectId: Constants.expoConfig.extra.eas.projectId,
      })
    ).data;
    // console.log(token);
  } else {
    alert("Must use physical device for Push Notifications");
  }

  if (Platform.OS === "android") {
    Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  console.log("token: ", token);
  return token;
}

export function ReadNudgeAlertNotification(data, dispatch) {
  dispatch(
    setNotification({ screen: "NudgeNavigation", data: { nudgeInfo: data } })
  );
}

export function ReadNotificationResponse(data, dispatch) {
  const { id, type = "nudgeAlert" } = data;
  if (type === "nudgeAlert") {
    ReadNudgeAlertNotification(data, dispatch);
  }
}

export default function PushNotification() {
  const authToken = useSelector((state) => state.auth.token);
  const [expoPushToken, setExpoPushToken] = useState("");
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const lastNotificationResponse = Notifications.useLastNotificationResponse();

  useEffect(() => {
    registerForPushNotificationsAsync().then((token) =>
      setExpoPushToken(token)
    );
  }, []);

  useEffect(() => {
    if (
      lastNotificationResponse &&
      lastNotificationResponse.notification.request.content.data &&
      lastNotificationResponse.actionIdentifier ===
        Notifications.DEFAULT_ACTION_IDENTIFIER
    ) {
      const data = lastNotificationResponse.notification.request.content.data;
      ReadNotificationResponse(data, dispatch);
    }
  }, [lastNotificationResponse, dispatch]);

  useEffect(() => {
    if (expoPushToken) {
      setNotificationToken(expoPushToken).then((res) => {
        // console.log(res.message, expoPushToken);
      });
    }
  }, [authToken, expoPushToken]);
  return <View></View>;
}

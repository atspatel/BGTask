import axios from "axios";
import * as config from "config";

export async function setNotificationToken(notificationToken) {
  const data = { notification_token: notificationToken };
  const api_url = `${config.host}/app/notification_token/`;
  return axios.post(api_url, data).then((res) => {
    return res.data;
  });
}

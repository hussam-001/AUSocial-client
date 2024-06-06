import axios from "axios";

import {
  cleanEmpty,
  convertTimezoneToUTC,
  convertUTCtoTimezone,
} from "@/utils";
import { backendApiUrl } from "@/constants";

const setAuthorizationHeader = (config: any) => {
  const jwt = JSON.parse(localStorage.getItem("jwt") || "");
  const lang = localStorage.getItem("i18nextLng");

  if (config.data && !(config.data instanceof FormData))
    config.data = cleanEmpty(config.data);

  config.data = convertTimezoneToUTC(config.data);
  config.headers.Authorization = `Bearer ${jwt}`;

  config.url = `${config.url}${
    config.url.includes("?") ? "&" : "?"
  }locale=${lang}`;

  return config;
};

export const publicInstance = axios.create({
  baseURL: `${backendApiUrl}`,
  timeout: 40000, // 40 seconds
});

publicInstance.interceptors.request.use((config) => {
  const lang = localStorage.getItem("i18nextLng");
  config.url = `${config.url}${
    config.url?.includes("?") ? "&" : "?"
  }locale=${lang}`;
  if (config.data && !(config.data instanceof FormData))
    config.data = cleanEmpty(config.data);

  config.data = convertTimezoneToUTC(config.data);

  return config;
});

publicInstance.interceptors.response.use((res) => {
  res.data = convertUTCtoTimezone(res.data);
  return res;
});

export const authInstance = axios.create({
  baseURL: backendApiUrl,
  timeout: 40000, // 40 seconds
});
authInstance.interceptors.request.use(setAuthorizationHeader);
authInstance.interceptors.response.use((res) => {
  res.data = convertUTCtoTimezone(res.data);
  return res;
});

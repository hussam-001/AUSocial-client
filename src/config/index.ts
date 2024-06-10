import { isPlatform } from "@/overrides/ionic/react";

export const isMobile =
  (isPlatform("mobile") ||
    isPlatform("mobileweb") ||
    isPlatform("capacitor")) &&
  (isPlatform("android") || isPlatform("ios")) &&
  !(isPlatform("tablet") || isPlatform("ipad"));

export const getBackendUrl = () => {
  const backendIp = localStorage.getItem("backendIp")?.replaceAll('"', "");
  const backendUrl = backendIp
    ? `http://${backendIp}:1337`
    : import.meta.env.VITE_BACKEND_URL;

  return backendUrl;
};

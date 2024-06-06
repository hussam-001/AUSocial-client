import { isPlatform } from "@/overrides/ionic/react";

export const isMobile =
  (isPlatform("mobile") ||
    isPlatform("mobileweb") ||
    isPlatform("capacitor")) &&
  (isPlatform("android") || isPlatform("ios")) &&
  !(isPlatform("tablet") || isPlatform("ipad"));

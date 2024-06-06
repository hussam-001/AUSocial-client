import { createContext, useEffect } from "react";

import { useQueryClient } from "@tanstack/react-query";
import { useIonLoading, useIonToast } from "@/overrides/ionic/react";

export const AppContext = createContext({});

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [presentToast] = useIonToast();
  const [presentLoading, dismissLoading] = useIonLoading();
  const queryClient = useQueryClient();

  useEffect(() => {
    queryClient.setDefaultOptions({
      queries: {
        staleTime: 1000 * 60 * 60, // 1 hour
      },
      mutations: {
        onMutate: () => {
          presentLoading();
        },
        onError: (error) => {
          presentToast({
            color: "danger",
            message: error.message,
          });
        },
        onSettled: () => {
          dismissLoading();
        },
      },
    });
  }, [queryClient]);

  return <AppContext.Provider value={{}}>{children}</AppContext.Provider>;
};

import { AxiosError } from "axios";
import { QueryCache, QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error) => {
      if ((error as AxiosError).response?.status === 401) {
        queryClient.invalidateQueries({ queryKey: ["me"] });
      }
    },
  }),
});

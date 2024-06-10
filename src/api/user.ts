import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { authInstance } from "@/config/axios";
import { useLocation } from "@/overrides/react-router";

export const useGetUser = (prop?: string) => {
  const { searchParams } = useLocation();
  const username = prop ?? searchParams.username;
  return useQuery({
    queryKey: ["users", username],
    queryFn: async () => {
      const res = await authInstance.get(`/user/${username}`);
      return res.data;
    },
    enabled: !!username,
  });
};

export const useGetUsers = () => {
  return useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await authInstance.get(`/users`);
      return res.data;
    },
  });
};

export const useFollowUser = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationKey: ["followUser"],
    mutationFn: async (data: any) => {
      const res = await authInstance.post(`/follows`, data);
      return res.data;
    },
    onSuccess: async () => {
      queryClient.invalidateQueries({
        queryKey: ["users"],
      });
      queryClient.invalidateQueries({
        queryKey: ["me"],
      });
    },
  });
  return mutation;
};

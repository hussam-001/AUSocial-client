import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useContext, useEffect } from "react";

import { authInstance, publicInstance } from "@/config/axios";
import { AuthContext } from "@/contexts/auth.context";
import { useHistory, useLocation } from "@/overrides/react-router";
import { PAGES } from "@/constants/routes";
import { AxiosError } from "axios";

export const signUp = async (data: any) => {
  return publicInstance
    .post("/auth/local/register", data)
    .then((res) => res.data);
};

export const signIn = async (data: any) => {
  return publicInstance.post("/auth/local", data).then((res) => res.data);
};

export const me = async () => {
  return authInstance.get("/users/me").then((res) => res.data);
};

export const forgotPassword = async (data: any) => {
  return publicInstance
    .post("/auth/forgot-password", data)
    .then((res) => res.data);
};

export const resetPassword = async (data: any) => {
  return publicInstance
    .post("/auth/reset-password", data)
    .then((res) => res.data);
};

export const authenticateProvider = async (
  provider: string,
  search: string = "",
) => {
  return publicInstance.get(`/auth/${provider}/callback${search}`);
};

export const useGetMe = () => {
  const { jwt, setJwt } = useContext(AuthContext);

  const query = useQuery({
    queryKey: ["me", jwt],
    queryFn: me,
    enabled: !!jwt,
  });

  useEffect(() => {
    if ((query.failureReason as AxiosError)?.response?.status === 401) {
      setJwt(null);
    }
  }, [query.failureReason]);

  return query;
};

export const useSignIn = () => {
  const history = useHistory();
  const { searchParams } = history.location;
  const { setJwt } = useContext(AuthContext);
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationKey: ["signIn"],
    mutationFn: signIn,
    onSuccess: (data) => {
      setJwt(data.jwt);
      queryClient.invalidateQueries({ queryKey: ["me"] });
      history.replace({
        pathname: searchParams?.returnUrl ?? PAGES.HOME.path,
        searchParams: {
          returnUrl: undefined,
        },
      });
    },
  });
  return mutation;
};

export const useSignOut = () => {
  const { setJwt } = useContext(AuthContext);
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationKey: ["signOut"],
    mutationFn: (e: any) => {
      setJwt(null);
      return queryClient.invalidateQueries({ queryKey: ["me"] });
    },
  });
  return mutation;
};

export const useSignUp = () => {
  const history = useHistory();
  const { searchParams } = history.location;
  const { setJwt } = useContext(AuthContext);
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationKey: ["signUp"],
    mutationFn: signUp,
    onSuccess: (res) => {
      console.log("🚀 ~ res:", res);
      setJwt(res.jwt);
      queryClient.invalidateQueries({ queryKey: ["me"] });
      history.replace({
        pathname: searchParams?.returnUrl ?? PAGES.HOME.path,
        searchParams: {
          returnUrl: undefined,
        },
      });
    },
  });
  return mutation;
};

export const useForgotPassword = () => {
  const mutation = useMutation({
    mutationKey: ["forgotPassword"],
    mutationFn: forgotPassword,
  });
  return mutation;
};

export const useResetPassword = () => {
  const { searchParams } = useLocation();
  const mutation = useMutation({
    mutationKey: ["resetPassword"],
    mutationFn: (data: any) =>
      resetPassword({
        ...data,
        ...searchParams,
      }),
  });
  return mutation;
};

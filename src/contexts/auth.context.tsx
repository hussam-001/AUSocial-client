import { createContext, ReactNode, useEffect } from "react";

import { useLocation } from "@/overrides/react-router";
import useLocalStorage from "@/hooks/useLocalStorage";

export const AuthContext = createContext<any>(null);

export const AuthProvider = ({ children }: { children?: ReactNode }) => {
  const { searchParams } = useLocation();
  const [jwt, setJwt] = useLocalStorage("jwt", undefined);

  useEffect(() => {
    if (!searchParams.jwt) return;
    setJwt(searchParams.jwt);
  }, [searchParams.jwt]);

  return (
    <AuthContext.Provider
      value={{
        jwt,
        setJwt,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

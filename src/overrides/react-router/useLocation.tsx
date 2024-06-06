import { useLocation } from "react-router";
import { useMemo } from "react";
import qs from "qs";

const useCustomLocation = () => {
  const location = useLocation();

  const searchParams: any = useMemo(
    () => qs.parse(location.search, { ignoreQueryPrefix: true }),
    [location.search]
  );

  return { ...location, searchParams };
};

export default useCustomLocation;

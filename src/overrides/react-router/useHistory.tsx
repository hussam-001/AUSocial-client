import { useHistory } from "react-router";
import qs from "qs";

import { useLocation } from "@/overrides/react-router";

const useCustomHistory = () => {
  const location = useLocation();
  const history = useHistory();

  const navigate =
    (type: "push" | "replace") =>
    (
      props: Parameters<typeof history.replace>[0] & {
        preserveSearchParams?: boolean;
        searchParams?: any;
        closeModals?: boolean;
      },
    ) => {
      if (typeof props === "string") {
        return history[type](props);
      } else {
        const { preserveSearchParams, searchParams, ...rest } = props;
        history[type]({
          ...rest,
          search: qs.stringify(
            {
              ...(preserveSearchParams === true ? location.searchParams : {}),
              ...(props.closeModals === false ? {} : { modals: undefined }),
              ...searchParams,
            },
            { addQueryPrefix: true, encodeValuesOnly: true },
          ),
        });
      }
    };

  return {
    ...history,
    location,
    push: navigate("push"),
    replace: navigate("replace"),
  };
};

export default useCustomHistory;

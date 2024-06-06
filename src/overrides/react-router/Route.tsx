import { Route } from "react-router";
import { ComponentProps, useContext, useEffect } from "react";

import { useHistory } from "@/overrides/react-router";
import ErrorBoundary from "@/components/ErrorBoundary";
import { AuthContext } from "@/contexts/auth.context";
import { PAGES } from "@/constants/routes";

const TRoute = (
  props: ComponentProps<typeof Route> & {
    authGuard?: boolean;
    computedMatch?: any;
  }
) => {
  return (
    <ErrorBoundary>
      {props.authGuard ? <AuthGuardedRoute {...props} /> : <Route {...props} />}
    </ErrorBoundary>
  );
};

export default TRoute;

const RedirectToSignIn = () => {
  const history = useHistory();

  useEffect(() => {
    history.replace({
      pathname: PAGES.SIGN_IN.path,
      searchParams: {
        returnUrl: history.location.pathname,
      },
    });
  }, []);

  return null;
};

const AuthGuardedRoute = (
  props: ComponentProps<typeof Route> & {
    authGuard?: boolean;
    computedMatch?: any;
  }
) => {
  const { jwt } = useContext(AuthContext);

  return (
    <Route {...props} component={jwt ? props.component : RedirectToSignIn} />
  );
};

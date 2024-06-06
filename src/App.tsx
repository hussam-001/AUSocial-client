import { useEffect } from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useTranslation } from "react-i18next";
import moment from "moment-timezone";
import "moment/dist/locale/tr";

import {
  IonApp,
  IonRouterOutlet,
  setupIonicReact,
} from "@/overrides/ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { Redirect, Route } from "@/overrides/react-router";
import { AppProvider } from "@/contexts/app.context";
import { AuthProvider } from "@/contexts/auth.context";
import ErrorBoundary from "@/components/ErrorBoundary";
import { queryClient } from "@/config/queryClient";
import { PAGES } from "@/constants/routes";
import { ModalsRenderer } from "@/hooks/useModal";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";
/* Theme variables */
import "@/theme/variables.scss";
import "@/theme/global.scss";

setupIonicReact();

const App: React.FC = () => {
  const { i18n } = useTranslation();

  useEffect(() => {
    moment.locale(i18n.language);
  }, [i18n.language]);

  return (
    <IonApp className={i18n.language !== "ar" ? "" : "arabic"}>
      <ErrorBoundary>
        <IonReactRouter>
          <QueryClientProvider client={queryClient}>
            <AuthProvider>
              <AppProvider>
                <ModalsRenderer />
                <Routes />
              </AppProvider>
            </AuthProvider>
            <div dir="ltr">
              <ReactQueryDevtools initialIsOpen={false} />
            </div>
          </QueryClientProvider>
        </IonReactRouter>
      </ErrorBoundary>
    </IonApp>
  );
};

export default App;

const Routes = () => {
  return (
    <IonRouterOutlet>
      {Object.values(PAGES).map(({ path, ...route }: any) => {
        const pathString = typeof path === "string" ? path : path();
        return <Route key={pathString} path={pathString} {...route} />;
      })}

      <Route
        render={() => {
          return (
            <Redirect
              to={{
                pathname: PAGES.HOME.path,
              }}
            />
          );
        }}
      />
    </IonRouterOutlet>
  );
};

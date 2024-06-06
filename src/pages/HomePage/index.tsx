import { home, menu, search } from "ionicons/icons";
import { useTranslation } from "react-i18next";

import {
  IonContent,
  IonIcon,
  IonLabel,
  IonPage,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
} from "@/overrides/ionic/react";
import { Redirect, RouteComponentProps } from "@/overrides/react-router";
import { Route } from "@/overrides/react-router";
import ExplorePage from "./ExplorePage";
import FeedPage from "./FeedPage";
import MenuPage from "./MenuPage";

const HomePage = ({}: RouteComponentProps) => {
  const { t } = useTranslation();
  return (
    <IonPage>
      <IonContent>
        <IonTabs>
          <IonRouterOutlet>
            <Redirect exact path="/home" to="/home/feed" />
            <Route exact path="/home/feed" render={() => <FeedPage />} />
            <Route exact path="/home/explore" render={() => <ExplorePage />} />
            <Route exact path="/home/menu" render={() => <MenuPage />} />
          </IonRouterOutlet>
          <IonTabBar slot="bottom">
            <IonTabButton tab="feed" href="/home/feed">
              <IonIcon icon={home} />
              <IonLabel>{t("COMMON.HOME")}</IonLabel>
            </IonTabButton>
            <IonTabButton tab="explore" href="/home/explore">
              <IonIcon icon={search} />
              <IonLabel>{t("COMMON.EXPLORE")}</IonLabel>
            </IonTabButton>
            <IonTabButton tab="menu" href="/home/menu">
              <IonIcon icon={menu} />
              <IonLabel>{t("COMMON.MENU")}</IonLabel>
            </IonTabButton>
          </IonTabBar>
        </IonTabs>
      </IonContent>
    </IonPage>
  );
};

export default HomePage;

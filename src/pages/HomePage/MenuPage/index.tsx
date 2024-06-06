import { useTranslation } from "react-i18next";
import { useContext } from "react";

import {
  IonAvatar,
  IonCard,
  IonCardContent,
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonListHeader,
  IonPage,
  IonSelect,
  IonSelectOption,
  IonTitle,
  IonToolbar,
} from "@/overrides/ionic/react";
import { useGetMe } from "@/api";
import Img from "@/components/shared/Img";
import Text from "@/components/shared/Text";
import { AuthContext } from "@/contexts/auth.context";
import { PAGES } from "@/constants/routes";
import UserName from "@/components/UserName";

const MenuPage = () => {
  const { t, i18n } = useTranslation();
  const { setJwt } = useContext(AuthContext);
  const { data: user } = useGetMe();

  const handleLanguageChange = (e: any) => {
    i18n.changeLanguage(e.detail.value);
  };

  const handleSignOut = () => {
    setJwt(null);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>{t("COMMON.MENU")}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <div className="mx-auto max-w-xl">
          <IonCard button routerLink={PAGES.USER_PAGE.path(user?.username)}>
            <IonCardContent>
              <IonItem>
                <IonAvatar slot="start">
                  <Img src={user?.avatar} />
                </IonAvatar>
                <IonLabel>
                  <UserName variant="h5" user={user} className="m-0" />
                  <Text variant="body2" color="medium" className="m-0">
                    @{user?.username}
                  </Text>
                </IonLabel>
              </IonItem>
            </IonCardContent>
          </IonCard>
          <IonCard>
            <IonCardContent>
              <IonListHeader className="mb-2 border-b border-b-gray-400">
                {t("COMMON.SETTINGS")}
              </IonListHeader>
              <IonItem>
                <IonSelect
                  value={i18n.language}
                  interface="popover"
                  onIonChange={handleLanguageChange}
                  label={t("COMMON.LANGUAGE")}
                >
                  <IonSelectOption value="en">EN (English)</IonSelectOption>
                  <IonSelectOption value="tr">TR (Türkçe)</IonSelectOption>
                </IonSelect>
              </IonItem>
              <IonItem button onClick={handleSignOut}>
                <IonLabel color="danger">{t("COMMON.LOGOUT")}</IonLabel>
              </IonItem>
            </IonCardContent>
          </IonCard>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default MenuPage;

import { useTranslation } from "react-i18next";

import {
  IonButton,
  IonContent,
  IonHeader,
  IonIcon,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@/overrides/ionic/react";
import Text from "@/components/shared/Text";
import { useLocation } from "@/overrides/react-router";
import Center from "@/components/shared/Center";
import { closeCircleOutline } from "ionicons/icons";

const ErrorPage = ({ message, redirectUrl }: any) => {
  const { t } = useTranslation();
  const { searchParams } = useLocation();
  const errorMessages = message ?? searchParams?.message;
  const errorRedirectUrl = redirectUrl ?? searchParams?.redirectUrl;
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>{t("COMMON.ERROR_OCCURRED")}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <Center>
          <IonIcon
            icon={closeCircleOutline}
            color="danger"
            style={{ width: 128, height: 128 }}
          />
          <Text variant="h1" className="my-2">
            Oops!
          </Text>
          <Text variant="h6" className="my-2" color="medium">
            {t("COMMON.SOMETHING_WENT_WRONG")}
          </Text>
          {errorMessages && (
            <div
              className="mx-2 my-2"
              style={{
                border: "1px solid var(--bk-border-color)",
                borderRadius: 4,
                backgroundColor: "#eee",
              }}
            >
              <Text
                variant="body1"
                className="m-4"
                style={{
                  maxWidth: 800,
                }}
              >
                {errorMessages}
              </Text>
            </div>
          )}
          {errorRedirectUrl && (
            <IonButton
              className="mt-3"
              color="primary"
              routerLink={errorRedirectUrl}
            >
              {t("COMMON.GO_BACK")}
            </IonButton>
          )}
        </Center>
      </IonContent>
    </IonPage>
  );
};

export default ErrorPage;

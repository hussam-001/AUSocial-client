import { useTranslation } from "react-i18next";

import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonCol,
  IonContent,
  IonHeader,
  IonIcon,
  IonPage,
  IonRouterLink,
  IonRow,
  IonTitle,
  IonToolbar,
} from "@/overrides/ionic/react";
import Text from "@/components/shared/Text";
import { RouteComponentProps } from "@/overrides/react-router";
import { useForm } from "@/overrides/react-hook-form";
import FormField from "@/components/shared/Form/FormField";
import TForm from "@/components/shared/Form";
import { PAGES } from "@/constants/routes";
import { useSignIn } from "@/api";

const SignInPage = ({ location: { search } }: RouteComponentProps) => {
  const { t } = useTranslation();
  const methods = useForm();
  const signIn = useSignIn();

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>{t("COMMON.LOGIN")}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <div className="mx-auto max-w-6xl">
          <IonRow className="ion-justify-content-center">
            <IonCol size="12" sizeMd="7">
              <div className="my-8 text-center">
                <IonIcon src="/favicon.svg" className="mb-4 h-36 w-36" />
                <Text variant="h1" color="dark">
                  AUSocial
                </Text>
                <Text variant="h4" color="dark">
                  {t("COMMON.WELCOME_BACK")}
                </Text>
              </div>
              <TForm methods={methods} onSubmit={signIn.mutate}>
                <IonCard>
                  <IonCardHeader>
                    <IonCardTitle>{t("COMMON.LOGIN")}</IonCardTitle>
                  </IonCardHeader>
                  <IonCardContent>
                    <IonRow>
                      <IonCol size="12">
                        <FormField
                          type="text"
                          name="identifier"
                          label={t("COMMON.EMAIL")}
                          placeholder="example@example.com"
                          rules={{ required: true }}
                        />
                      </IonCol>
                      <IonCol size="12">
                        <FormField
                          type="password"
                          name="password"
                          label={t("COMMON.PASSWORD")}
                          placeholder="********"
                          rules={{ required: true }}
                        />
                      </IonCol>
                      {/* <IonCol size="12" className="my-2">
                        <IonRow className="ion-justify-content-between w-full">
                          <FormField name="rememberMe" type="checkbox">
                            <Text variant="body1">
                              {t("COMMON.REMAIN_SIGNED_IN")}
                            </Text>
                          </FormField>
                          <IonRouterLink
                            routerLink={`${PAGES.FORGOT_PASSWORD.path}${search}`}
                          >
                            <Text variant="body1">
                              {t("COMMON.FORGOT_PASSWORD")}
                            </Text>
                          </IonRouterLink>
                        </IonRow>
                      </IonCol> */}
                      <IonButton className="w-full" type="submit">
                        {t("COMMON.LOGIN")}
                      </IonButton>
                      <IonCol size="12" className="ion-text-center my-2">
                        <Text variant="body1">
                          {t("COMMON.DONT_HAVE_AN_ACCOUNT")}{" "}
                          <IonRouterLink
                            routerLink={`${PAGES.SIGN_UP.path}${search}`}
                          >
                            {t("COMMON.SIGN_UP")}
                          </IonRouterLink>
                        </Text>
                      </IonCol>
                    </IonRow>
                  </IonCardContent>
                </IonCard>
              </TForm>
            </IonCol>
          </IonRow>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default SignInPage;

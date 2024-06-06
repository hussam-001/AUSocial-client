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
  IonPage,
  IonRadio,
  IonRouterLink,
  IonRow,
  IonTitle,
  IonToolbar,
} from "@/overrides/ionic/react";
import { RouteComponentProps } from "@/overrides/react-router";
import Text from "@/components/shared/Text";
import { useForm, useWatch } from "@/overrides/react-hook-form";
import FormField from "@/components/shared/Form/FormField";
import TForm from "@/components/shared/Form";
import { PAGES } from "@/constants/routes";
import { useSignUp } from "@/api";

const SignUpPage = ({ location: { search } }: RouteComponentProps) => {
  const { t } = useTranslation();

  const methods = useForm({
    defaultValues: {
      gender: "other",
    },
  });
  const [password] = useWatch({
    control: methods.control,
    name: ["password"],
  });
  const signUp = useSignUp();

  const genderOptions = [
    {
      label: t("COMMON.MALE"),
      value: "male",
    },
    {
      label: t("COMMON.FEMALE"),
      value: "female",
    },
  ];

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>{t("COMMON.SIGN_UP")}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <div className="mx-auto max-w-6xl">
          <IonRow className="ion-justify-content-center">
            <IonCol size="12" sizeLg="7">
              <TForm methods={methods} onSubmit={signUp.mutate}>
                <IonCard>
                  <IonCardHeader>
                    <IonCardTitle>{t("COMMON.SIGN_UP")}</IonCardTitle>
                  </IonCardHeader>
                  <IonCardContent>
                    <IonRow>
                      {/* <IonCol size="12">
                        <FormField
                          type="img-picker"
                          name="avatar"
                          label={t("COMMON.AVATAR")}
                          borderRadius="50%"
                        />
                      </IonCol> */}
                      <IonCol size="12" sizeMd="6">
                        <FormField
                          type="text"
                          name="firstName"
                          label={t("COMMON.FIRST_NAME")}
                          rules={{ required: true }}
                        />
                      </IonCol>
                      <IonCol size="12" sizeMd="6">
                        <FormField
                          type="text"
                          name="lastName"
                          label={t("COMMON.LAST_NAME")}
                        />
                      </IonCol>
                      <IonCol size="12" sizeMd="6">
                        <FormField
                          type="email"
                          name="email"
                          label={t("COMMON.EMAIL")}
                          rules={{ required: true }}
                        />
                      </IonCol>
                      <IonCol size="12" sizeMd="6">
                        <FormField
                          type="tel"
                          name="username"
                          label={t("COMMON.USERNAME")}
                          rules={{ required: true }}
                        />
                      </IonCol>
                      <IonCol size="12">
                        <FormField
                          type="radio"
                          name="gender"
                          label={t("COMMON.GENDER")}
                          rules={{ required: true }}
                        >
                          {genderOptions.map(({ value, label }) => (
                            <IonRadio
                              key={value}
                              value={value}
                              labelPlacement="end"
                              className="me-4 mt-2"
                            >
                              {label}
                            </IonRadio>
                          ))}
                        </FormField>
                      </IonCol>
                      <IonCol size="12" sizeMd="6">
                        <FormField
                          type="password"
                          name="password"
                          label={t("COMMON.PASSWORD")}
                          rules={{ required: true }}
                        />
                      </IonCol>
                      <IonCol size="12" sizeMd="6">
                        <FormField
                          type="password"
                          name="confirmPassword"
                          label={t("COMMON.CONFIRM_PASSWORD")}
                          rules={{
                            required: true,
                            validate: (value) => {
                              return (
                                value === password ||
                                t("COMMON.THE_PASSWORDS_DO_NOT_MATCH")
                              );
                            },
                          }}
                        />
                      </IonCol>
                      <IonButton className="w-full" type="submit">
                        {t("COMMON.SIGN_UP")}
                      </IonButton>
                      <IonCol className="ion-text-center my-2">
                        <Text variant="body1">
                          {t("COMMON.ALREADY_HAVE_AN_ACCOUNT")}
                          <br />
                          <IonRouterLink
                            routerLink={`${PAGES.SIGN_IN.path}${search}`}
                          >
                            {t("COMMON.LOGIN_NOW")}
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

export default SignUpPage;

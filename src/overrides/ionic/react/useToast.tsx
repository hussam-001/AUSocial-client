import { useIonToast } from "@ionic/react";
import { useTranslation } from "react-i18next";

const useToast = () => {
  const { t } = useTranslation();
  const [present, ...rest] = useIonToast();
  const presentToast = (options: any) => {
    return present({
      position: "top",
      duration: 3000,
      buttons: [
        {
          text: t("COMMON.DISMISS"),
          role: "cancel",
        },
      ],
      ...options,
    });
  };
  return [presentToast, ...rest];
};

export default useToast;

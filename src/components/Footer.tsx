import { useTranslation } from "react-i18next";

import { IonFooter, IonToolbar } from "@/overrides/ionic/react";

const Footer = ({ buttonProps }: any) => {
  const { t } = useTranslation();

  return (
    <IonFooter>
      <IonToolbar className="max-w-xl"></IonToolbar>
    </IonFooter>
  );
};

export default Footer;

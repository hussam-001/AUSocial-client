import { useTranslation } from "react-i18next";
import { pencil } from "ionicons/icons";

import {
  IonAvatar,
  IonButton,
  IonCard,
  IonIcon,
  IonItem,
  IonLabel,
} from "@/overrides/ionic/react";
import Text from "@/components/shared/Text";
import Img from "@/components/shared/Img";
import { useGetMe } from "@/api";
import { MODALS } from "@/constants/routes";
import useModal from "@/hooks/useModal";
import UserName from "./UserName";

const NewPostCard = () => {
  const { t } = useTranslation();
  const { data: user } = useGetMe();
  const newPostModal = useModal(MODALS.NEW_POST);

  return (
    <IonCard>
      <IonItem lines="none">
        <IonAvatar slot="start">
          <Img src={user?.avatar} format="thumbnail" />
        </IonAvatar>
        <IonLabel>
          <UserName variant="body1" user={user} />
          <Text variant="body2" color="medium">
            @{user?.username}
          </Text>
        </IonLabel>
        <IonButton
          size="default"
          shape="round"
          onClick={() => newPostModal.open()}
        >
          <IonIcon slot="start" icon={pencil} />
          {t("COMMON.NEW_POST")}
        </IonButton>
      </IonItem>
    </IonCard>
  );
};

export default NewPostCard;

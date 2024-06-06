import { useTranslation } from "react-i18next";
import { pencil, close } from "ionicons/icons";

import {
  IonAvatar,
  IonButton,
  IonCard,
  IonCardContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonRow,
  IonContent,
  IonHeader,
  IonModal,
  IonTitle,
  IonToolbar,
} from "@/overrides/ionic/react";
import Text from "@/components/shared/Text";
import { cn } from "@/utils";
import Img from "@/components/shared/Img";
import { useGetMe } from "@/api";
import { useForm } from "@/overrides/react-hook-form";
import TForm from "@/components/shared/Form";
import FormField from "@/components/shared/Form/FormField";
import { useCreatePost } from "@/api";
import { useHistory } from "@/overrides/react-router";
import IconButton from "@/components/shared/IconButton";
import UserName from "@/components/UserName";

const NewPostModal = () => {
  const { t } = useTranslation();
  const history = useHistory();
  const { data: user } = useGetMe();
  const methods = useForm();
  const createPost = useCreatePost();

  return (
    <IonModal
      isOpen
      keepContentsMounted={false}
      backdropDismiss={false}
      style={{
        "--min-height": "90%",
      }}
    >
      <IonHeader className="ion-no-border border-bottom">
        <IonToolbar>
          <IonTitle>{t("COMMON.NEW_POST")}</IonTitle>
          <IconButton
            slot="end"
            icon={close}
            onClick={() => history.goBack()}
          />
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <TForm methods={methods} onSubmit={createPost.mutate}>
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
            </IonItem>
            <IonCardContent>
              <FormField
                type="richtext"
                name="content"
                rules={{ required: true }}
              />
              <IonRow className={cn("justify-end")}>
                <IonButton type="submit" shape="round" color="primary">
                  <IonIcon slot="start" icon={pencil} />
                  {t("COMMON.POST")}
                </IonButton>
              </IonRow>
            </IonCardContent>
          </IonCard>
        </TForm>
      </IonContent>
    </IonModal>
  );
};

export default NewPostModal;

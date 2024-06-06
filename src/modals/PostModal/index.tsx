import { useTranslation } from "react-i18next";
import { close } from "ionicons/icons";

import {
  IonAvatar,
  IonButton,
  IonCard,
  IonContent,
  IonHeader,
  IonModal,
  IonTitle,
  IonToolbar,
  IonFooter,
} from "@/overrides/ionic/react";
import { cn } from "@/utils";
import Img from "@/components/shared/Img";
import { useComment, useGetMe, useGetPost } from "@/api";
import { useForm } from "@/overrides/react-hook-form";
import TForm from "@/components/shared/Form";
import FormField from "@/components/shared/Form/FormField";
import { useHistory } from "@/overrides/react-router";
import IconButton from "@/components/shared/IconButton";
import PostCard from "@/components/PostCard";
import useModal from "@/hooks/useModal";
import { MODALS } from "@/constants/routes";
import CommentItem from "@/components/CommentItem";

const PostModal = () => {
  const { t } = useTranslation();
  const history = useHistory();
  const postModal = useModal(MODALS.POST);
  const methods = useForm();
  const { data: post } = useGetPost({ id: postModal?.data?.id });
  const { data: user } = useGetMe();
  const commentOnPost = useComment({ methods });

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
          <IonTitle>
            {t("COMMON.POST")} {post?.id}
          </IonTitle>
          <IconButton
            slot="end"
            icon={close}
            onClick={() => history.goBack()}
          />
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <PostCard {...post} />
        <IonCard>
          {post?.comments?.map((comment: any) => (
            <CommentItem key={comment?.id} {...comment} />
          ))}
        </IonCard>
      </IonContent>
      <TForm
        methods={methods}
        onSubmit={(data) => {
          commentOnPost.mutate({
            ...data,
            post: {
              id: post?.id,
            },
          });
        }}
      >
        <IonFooter>
          <IonToolbar>
            <IonAvatar slot="start" className={cn("me-2 p-2")}>
              <Img src={user?.avatar} />
            </IonAvatar>
            <FormField type="text" name="content" fill="solid" />
            <IonButton
              shape="round"
              slot="end"
              type="submit"
              color="primary"
              className={cn("me-2")}
            >
              {t("COMMON.COMMENT")}
            </IonButton>
          </IonToolbar>
        </IonFooter>
      </TForm>
    </IonModal>
  );
};

export default PostModal;

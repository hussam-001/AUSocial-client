import moment from "moment";
import { useTranslation } from "react-i18next";
import {
  chatbubbles,
  checkmarkCircle,
  ellipsisVertical,
  heart,
} from "ionicons/icons";
import MDEditor from "@uiw/react-md-editor";

import {
  IonAvatar,
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonPopover,
  IonRouterLink,
} from "@/overrides/ionic/react";
import { cn } from "@/utils";
import Img from "@/components/shared/Img";
import { useGetMe, useDeletePost, useToggleReactPost, useGetPost } from "@/api";
import Text from "@/components/shared/Text";
import IconButton from "@/components/shared/IconButton";
import { MODALS, PAGES } from "@/constants/routes";
import useModal from "@/hooks/useModal";
import FollowButton from "./FollowButton";
import UserName from "./UserName";

const PostCard = ({ id, hideFollowButton }: any) => {
  const { data: post } = useGetPost({ id });
  const { postedBy, createdAt, content, reactions, comments } = post || {};
  const { t } = useTranslation();
  const { data: user } = useGetMe();
  const deletePost = useDeletePost();
  const toggleReact = useToggleReactPost();
  const postModal = useModal(MODALS.POST);
  const userPageRouterLink = PAGES.USER_PAGE.path(postedBy?.username);
  const isMe = user?.id === postedBy?.id;
  return (
    <IonCard>
      <IonItem lines="none">
        <IonAvatar slot="start">
          <Img src={postedBy?.avatar} format="thumbnail" />
        </IonAvatar>
        <IonLabel>
          <IonRouterLink color="dark" routerLink={userPageRouterLink}>
            <UserName variant="body1" user={postedBy} />
            <Text variant="body2" color="medium">
              @{postedBy?.username} · {moment(createdAt).fromNow()}
            </Text>
          </IonRouterLink>
        </IonLabel>
        {!hideFollowButton && (
          <FollowButton slot="end" username={postedBy?.username} />
        )}
        {isMe && (
          <>
            <IconButton
              icon={ellipsisVertical}
              trigger="click"
              id={`post-${id}`}
              slot="end"
            />
            <IonPopover trigger={`post-${id}`}>
              <IonItem
                lines="none"
                button
                onClick={() => deletePost.alertMutate(id)}
              >
                <IonLabel color="danger">{t("COMMON.DELETE")}</IonLabel>
              </IonItem>
            </IonPopover>
          </>
        )}
      </IonItem>
      <IonCardContent>
        <MDEditor.Markdown source={content} style={{}} />
      </IonCardContent>
      <IonButtons className="border-t border-solid border-gray-600">
        <IonButton
          className={cn("w-1/2")}
          onClick={() => toggleReact.mutate(post)}
          color={
            reactions?.find(({ reactedBy }: any) => reactedBy?.id === user?.id)
              ? "danger"
              : "medium"
          }
        >
          <Text slot="start">{reactions?.length}</Text>
          <IonIcon slot="start" icon={heart} />
          {t("COMMON.LIKE")}
        </IonButton>
        <IonButton
          color="medium"
          className={cn("w-1/2")}
          onClick={() => postModal.open({ id })}
        >
          <Text slot="start">{comments?.length}</Text>
          <IonIcon slot="start" icon={chatbubbles} />
          {t("COMMON.COMMENT")}
        </IonButton>
      </IonButtons>
    </IonCard>
  );
};

export default PostCard;

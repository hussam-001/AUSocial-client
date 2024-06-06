import React from "react";
import { useTranslation } from "react-i18next";
import { add } from "ionicons/icons";

import { IonButton, IonIcon } from "@/overrides/ionic/react";
import { useFollowUser, useGetMe, useGetUser } from "@/api";

const FollowButton = ({ username, ...rest }: any) => {
  const { t } = useTranslation();
  const { data: me } = useGetMe();
  const { data: user } = useGetUser(username);
  const followUser = useFollowUser();
  const isMe = me?.id === user?.id;
  const isFollowing = me?.followings?.some(
    ({ following }: any) => following?.id === user?.id,
  );

  if (isMe) return null;
  return (
    <IonButton
      color="primary"
      shape="round"
      onClick={() => {
        followUser.mutate({
          id: user?.id,
        });
      }}
      {...(isFollowing
        ? {
            fill: "outline",
            children: <>{t("COMMON.FOLLOWING")}</>,
          }
        : {
            fill: "solid",
            children: (
              <>
                <IonIcon slot="start" icon={add} />
                {t("COMMON.FOLLOW")}
              </>
            ),
          })}
      {...rest}
    />
  );
};

export default FollowButton;

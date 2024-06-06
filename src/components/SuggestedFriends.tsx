import { useTranslation } from "react-i18next";

import {
  IonAvatar,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonItem,
  IonLabel,
  IonSkeletonText,
} from "@/overrides/ionic/react";
import Img from "@/components/shared/Img";
import { PAGES } from "@/constants/routes";
import { useGetUsers } from "@/api";
import FollowButton from "./FollowButton";
import Text from "./shared/Text";
import UserName from "./UserName";

const SuggestedFriends = ({ filter = Boolean }: any) => {
  const { t } = useTranslation();
  const { data: users, isLoading } = useGetUsers();

  return (
    <IonCard>
      <IonCardHeader>
        <IonCardTitle>{t("COMMON.SUGGESTED_FRIENDS")}</IonCardTitle>
      </IonCardHeader>
      {isLoading && <IonSkeletonText />}
      {users?.filter(filter).map((user: any) => (
        <IonItem
          key={user.id}
          routerLink={PAGES.USER_PAGE.path(user?.username)}
        >
          <IonAvatar slot="start">
            <Img src={user.avatar} />
          </IonAvatar>
          <Text>
            <UserName variant="body1" color="dark" user={user} />
            <Text variant="body2" color="medium">
              @{user?.username}
            </Text>
          </Text>
          <FollowButton slot="end" username={user?.username} />
        </IonItem>
      ))}
    </IonCard>
  );
};

export default SuggestedFriends;

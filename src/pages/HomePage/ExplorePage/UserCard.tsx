import FollowButton from "@/components/FollowButton";
import Img from "@/components/shared/Img";
import Text from "@/components/shared/Text";
import { PAGES } from "@/constants/routes";
import {
  IonAvatar,
  IonCard,
  IonCardContent,
  IonSkeletonText,
} from "@/overrides/ionic/react";
import UserName from "@/components/UserName";

const UserCard = ({ user }: any) => {
  return (
    <IonCard
      routerLink={PAGES.USER_PAGE.path(user?.username)}
      className="ion-text-center ion-no-margin"
    >
      <IonCardContent>
        <IonAvatar className="mx-auto h-24 w-24">
          {!user ? <IonSkeletonText animated /> : <Img src={user.avatar} />}
        </IonAvatar>
        <div className="mb-4 mt-6">
          <Text variant="body1" color="dark">
            {!user ? <IonSkeletonText animated /> : <UserName user={user} />}
          </Text>
          <Text variant="body2" color="medium">
            {!user ? <IonSkeletonText animated /> : `@${user?.username}`}
          </Text>
        </div>
        {!user ? (
          <IonSkeletonText animated className="h-8 rounded-2xl" />
        ) : (
          <FollowButton
            slot="end"
            username={user?.username}
            className="mx-auto"
          />
        )}
      </IonCardContent>
    </IonCard>
  );
};

export default UserCard;

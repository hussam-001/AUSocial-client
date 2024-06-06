import { useTranslation } from "react-i18next";

import {
  IonAvatar,
  IonCard,
  IonCardContent,
  IonCol,
  IonContent,
  IonHeader,
  IonPage,
  IonRow,
  IonTitle,
  IonToolbar,
} from "@/overrides/ionic/react";
import { useGetUser } from "@/api";
import Img from "@/components/shared/Img";
import Text from "@/components/shared/Text";
import PostCard from "@/components/PostCard";
import FollowButton from "@/components/FollowButton";
import UserName from "@/components/UserName";

const UserPage = () => {
  const { t } = useTranslation();
  const { data: user } = useGetUser();
  const { avatar, username, posts, followings, followers } = user || {};
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>@{username}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <div className="mx-auto max-w-screen-md">
          <IonCard>
            <IonCardContent>
              <IonRow className="ion-justify-content-between ion-align-items-center">
                <IonCol size="12" sizeMd="3">
                  <IonAvatar
                    className="mx-auto aspect-square"
                    style={{
                      maxWidth: 128,
                      width: "100%",
                      height: "auto",
                    }}
                  >
                    <Img src={avatar} />
                  </IonAvatar>
                </IonCol>
                <IonCol size="12" sizeMd="9">
                  <IonRow className="ion-align-items-center ion-justify-content-between mb-8">
                    <div>
                      <UserName
                        variant="h5"
                        color="dark"
                        fontWeight="bold"
                        user={user}
                        className="pb-2"
                      />
                      <Text color="medium" variant="h6" fontWeight="bold">
                        @{username}
                      </Text>
                    </div>
                    <FollowButton username={username} />
                  </IonRow>
                  <Text color="dark" variant="body1" className="flex">
                    <Text>
                      <Text fontWeight="bold">{posts?.length}</Text>{" "}
                      <Text color="medium">{t("COMMON.POSTS")}</Text>
                    </Text>
                    <Text className={"mx-2 md:mx-16"}>
                      <Text fontWeight="bold">{followings?.length}</Text>{" "}
                      <Text color="medium"> {t("COMMON.FOLLOWING")}</Text>
                    </Text>
                    <Text>
                      <Text fontWeight="bold">{followers?.length}</Text>{" "}
                      <Text color="medium"> {t("COMMON.FOLLOWERS")}</Text>
                    </Text>
                  </Text>
                </IonCol>
              </IonRow>
            </IonCardContent>
          </IonCard>
          {posts?.map((post: any) => (
            <PostCard hideFollowButton key={post?.id} {...post} />
          ))}
        </div>
      </IonContent>
    </IonPage>
  );
};

export default UserPage;

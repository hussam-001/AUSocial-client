import { alertCircleOutline } from "ionicons/icons";

import {
  IonAvatar,
  IonBackButton,
  IonButtons,
  IonHeader,
  IonIcon,
  IonProgressBar,
  IonRouterLink,
  IonSkeletonText,
  IonTitle,
  IonToolbar,
} from "@/overrides/ionic/react";
import Text from "@/components/shared/Text";
import { isMobile } from "@/config";
import Img from "@/components/shared/Img";
import { PAGES } from "@/constants/routes";
import { useGetMe } from "@/api";
import UserName from "./UserName";

const Header = ({ backButtonProps, isLoading }: any) => {
  const { data: user, isLoading: userLoading, error } = useGetMe();
  const userPageRouterLink = PAGES.USER_PAGE.path(user?.username);
  return (
    <IonHeader className="ion-no-border border-bottom">
      <IonToolbar>
        <IonButtons slot="start">
          <IonBackButton text="" {...backButtonProps} />
        </IonButtons>
        {error && (
          <>
            <IonAvatar slot="start">
              <IonIcon
                color="danger"
                icon={alertCircleOutline}
                style={{
                  width: "100%",
                  height: "100%",
                }}
              />
            </IonAvatar>
            <IonTitle>{error?.message}</IonTitle>
          </>
        )}
        {userLoading && (
          <>
            <IonAvatar slot="start">
              <IonSkeletonText animated />
            </IonAvatar>
            <IonTitle>
              <IonSkeletonText animated style={{ width: "50%" }} />
              <IonSkeletonText animated style={{ width: "30%" }} />
            </IonTitle>
          </>
        )}
        {user && (
          <>
            <IonRouterLink slot="start" routerLink={userPageRouterLink}>
              <IonAvatar className="p-1">
                <Img src={user?.avatar} />
              </IonAvatar>
            </IonRouterLink>
            <IonTitle style={{ width: "fit-content" }}>
              <IonRouterLink color="dark" routerLink={userPageRouterLink}>
                <UserName variant="h4" user={user} className="m-0" />
                {!isMobile && (
                  <Text variant="body2" className="m-0">
                    @{user?.username}
                  </Text>
                )}
              </IonRouterLink>
            </IonTitle>
          </>
        )}
      </IonToolbar>
      {(isLoading || userLoading) && <IonProgressBar type="indeterminate" />}
    </IonHeader>
  );
};

export default Header;

import { add } from "ionicons/icons";
import { useTranslation } from "react-i18next";

import { useGetPosts } from "@/api/post";
import NewPostCard from "@/components/NewPostCard";
import PostCard from "@/components/PostCard";
import SuggestedFriends from "@/components/SuggestedFriends";
import { MODALS } from "@/constants/routes";
import useModal from "@/hooks/useModal";
import {
  IonContent,
  IonFab,
  IonFabButton,
  IonHeader,
  IonIcon,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
  IonPage,
  IonRefresher,
  IonRefresherContent,
  IonTitle,
  IonToolbar,
} from "@/overrides/ionic/react";
import { cn } from "@/utils";

const FeedPage = () => {
  const { t } = useTranslation();
  const { posts, handleRefresh, handleInfiniteScroll } = useGetPosts();
  const newPostModal = useModal(MODALS.NEW_POST);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>{t("COMMON.HOME")}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonRefresher slot="fixed" onIonRefresh={handleRefresh}>
          <IonRefresherContent></IonRefresherContent>
        </IonRefresher>
        <IonFab
          vertical="bottom"
          horizontal="end"
          slot="fixed"
          className={cn("bottom-16 end-8")}
        >
          <IonFabButton
            onClick={() => {
              newPostModal.open();
            }}
          >
            <IonIcon icon={add} />
          </IonFabButton>
        </IonFab>
        <div className={cn("justify-center md:flex")}>
          <div className={cn("w-full max-w-xl")}>
            <NewPostCard />
            {posts?.map((post: any) => <PostCard key={post.id} {...post} />)}
          </div>
          <div className={cn("sticky top-0 h-full min-w-fit max-w-xl")}>
            <SuggestedFriends />
          </div>
        </div>
        <IonInfiniteScroll onIonInfinite={handleInfiniteScroll}>
          <IonInfiniteScrollContent
            loadingText="Please wait..."
            loadingSpinner="bubbles"
          />
        </IonInfiniteScroll>
      </IonContent>
    </IonPage>
  );
};

export default FeedPage;

import { useTranslation } from "react-i18next";
import { useMemo, useState } from "react";

import {
  IonCol,
  IonContent,
  IonHeader,
  IonPage,
  IonRow,
  IonSearchbar,
  IonTitle,
  IonToolbar,
} from "@/overrides/ionic/react";
import { getFullName } from "@/utils";
import { useGetUsers } from "@/api";
import UserCard from "./UserCard";
import Text from "@/components/shared/Text";

const ExplorePage = () => {
  const { t } = useTranslation();
  const [searchText, setSearchText] = useState("");
  const { data: users, isLoading } = useGetUsers();

  const handleSearch = (e: any) => {
    setSearchText(e.detail.value);
  };

  const filteredUsers = useMemo(() => {
    if (!searchText) return users;
    return users?.filter((user: any) => {
      const fullName = getFullName(user);
      return (
        fullName.toLowerCase().includes(searchText.toLowerCase()) ||
        user.username.toLowerCase().includes(searchText.toLowerCase())
      );
    });
  }, [users, searchText]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>{t("COMMON.EXPLORE")}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <div className="mx-auto max-w-2xl">
          <IonSearchbar
            onIonInput={handleSearch}
            placeholder={t("COMMON.SEARCH")}
          />

          <IonRow className="mt-4">
            <IonCol size="12">
              <Text variant="h6" color="dark">
                {t("COMMON.USERS")}
              </Text>
            </IonCol>
            {isLoading &&
              new Array(3).fill(0).map((_, i) => (
                <IonCol key={i} size="12" sizeMd="4">
                  <UserCard />
                </IonCol>
              ))}
            {filteredUsers?.map((user: any) => (
              <IonCol key={user.id} size="12" sizeMd="4">
                <UserCard user={user} />
              </IonCol>
            ))}
          </IonRow>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default ExplorePage;

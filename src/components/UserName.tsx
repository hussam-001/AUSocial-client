import { checkmarkCircle } from "ionicons/icons";
import { IonIcon } from "@ionic/react";

import { getFullName } from "@/utils";
import Text from "./shared/Text";

const UserName = ({ user, ...rest }: any) => {
  return (
    <Text {...rest}>
      {getFullName(user)}{" "}
      {user?.verified && <IonIcon color="secondary" icon={checkmarkCircle} />}
    </Text>
  );
};

export default UserName;

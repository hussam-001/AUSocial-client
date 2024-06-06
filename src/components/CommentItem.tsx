import moment from "moment";

import { IonAvatar, IonItem, IonLabel } from "@/overrides/ionic/react";
import Img from "@/components/shared/Img";
import Text from "@/components/shared/Text";
import UserName from "./UserName";

const CommentItem = (comment: any) => {
  const { id, commentedBy, content, reactions, comments, createdAt } = comment;
  return (
    <IonItem>
      <IonAvatar slot="start">
        <Img src={commentedBy?.avatar} />
      </IonAvatar>
      <IonLabel>
        <Text variant="body2">
          <UserName user={commentedBy} />
          <Text color="medium">
            @{commentedBy?.username} · {moment(createdAt).fromNow()}
          </Text>
        </Text>
        <Text variant="body2">{content}</Text>
      </IonLabel>
    </IonItem>
  );
};

export default CommentItem;

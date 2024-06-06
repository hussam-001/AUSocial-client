import { IonItem } from "@/overrides/ionic/react";
import style from "./style.module.scss";

const Note = ({ color, className, ...rest }: any) => {
  return (
    <IonItem
      className={`${style.note} ${style[color]} ${className}`}
      {...rest}
    />
  );
};
export default Note;

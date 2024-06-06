import { IonButton, IonButtons, IonIcon } from "@/overrides/ionic/react";
import style from "./style.module.scss";

const IconButton = ({
  icon,
  iconSize,
  iconBackgroundColor,
  iconBorderRadius,
  radius,
  children,
  slot,
  text,
  className,
  ...rest
}: any) => {
  return (
    <IonButtons
      className={`${style.iconButton} ${className}`}
      slot={slot ?? ""}
    >
      <IonButton
        style={{ width: radius, height: radius }}
        shape="round"
        color="dark"
        {...rest}
      >
        {children ?? (
          <IonIcon
            icon={icon}
            style={{
              width: iconSize,
              height: iconSize,
              backgroundColor: iconBackgroundColor,
              borderRadius: iconBorderRadius,
            }}
            slot="icon-only"
          />
        )}
      </IonButton>
    </IonButtons>
  );
};
export default IconButton;

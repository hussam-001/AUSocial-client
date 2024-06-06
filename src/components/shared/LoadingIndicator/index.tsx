import { IonLoading } from "@ionic/react";

const LoadingIndicator = (
  props: React.ComponentProps<typeof IonLoading> & {
    elementRef?: React.RefObject<HTMLIonLoadingElement>;
  },
) => {
  return <IonLoading ref={props.elementRef} {...props}></IonLoading>;
};

export default LoadingIndicator;

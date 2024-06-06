import { useIonLoading } from "@ionic/react";

const useLoading = () => {
  const [present, dismiss] = useIonLoading();

  const customPresent = (props?: Parameters<typeof present>) => {
    present({
      spinner: "lines-sharp",
      ...props,
    });
  };

  return [customPresent, dismiss];
};

export default useLoading;

import { IonIcon, IonNote } from "@ionic/react";
import { Camera, CameraResultType } from "@capacitor/camera";
import { add } from "ionicons/icons";

import Img from "../Img";
import style from "./style.module.scss";

const ImgPicker = ({
  imgUrl,
  field,
  errorMessage,
  label,
  borderRadius,
  height = "100px",
  width = "100px",
  ...rest
}: any) => {
  const handleGetPhoto = async () => {
    const image = await Camera.getPhoto({
      quality: 90,
      webUseInput: true,
      resultType: CameraResultType.Uri,
    });

    const blob = await fetch(image.webPath!).then((r) => r.blob());
    field.onChange(blob);
  };

  return (
    <div className={style.filePickerInput}>
      <div
        style={{ borderRadius, width, height }}
        className={`${style.inputCircle} ${
          errorMessage && style.inputCircleError
        }`}
        onClick={handleGetPhoto}
      >
        {field.value ? (
          <Img
            src={field.value?.url ?? URL.createObjectURL(field.value)}
            alt={field.name}
          />
        ) : (
          <div className={style.fileInputWrapper}>
            <IonIcon size="large" icon={add} />
          </div>
        )}
      </div>
      <div className="ion-text-center">
        <p>{label}</p>
        <IonNote slot="error" color="danger">
          <p>{errorMessage}</p>
        </IonNote>
      </div>
    </div>
  );
};
export default ImgPicker;

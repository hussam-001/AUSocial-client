import { createRoot } from "react-dom/client";
import { ComponentProps, useEffect, useState } from "react";
import { eyeOffOutline, eyeOutline } from "ionicons/icons";
import { useTranslation } from "react-i18next";

import { UseFormRegisterReturn } from "@/overrides/react-hook-form";
import { IonInput } from "@/overrides/ionic/react";
import IconButton from "@/components/shared/IconButton";

interface IPasswordFieldProps extends ComponentProps<typeof IonInput> {
  field?: UseFormRegisterReturn<string>;
}

const PasswordField = ({ type, field, ...rest }: IPasswordFieldProps) => {
  const { i18n } = useTranslation();
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const buttonElement = document.querySelector(
      ".input-clear-icon.sc-ion-input-md"
    );
    let root: any;
    if (buttonElement) {
      const newButton = buttonElement.cloneNode(true) as HTMLElement;
      buttonElement.parentNode!.replaceChild(newButton, buttonElement);
      root = createRoot(newButton);
      root.render(
        <IconButton
          slot="clear"
          color="dark"
          className="ms-3"
          icon={showPassword ? eyeOffOutline : eyeOutline}
          onClick={() => setShowPassword((curr) => !curr)}
        />
      );
    }

    return () => {
      if (root) {
        setTimeout(() => root.unmount(), 0);
      }
    };
  }, [field?.ref, showPassword]);

  return (
    <IonInput
      dir={i18n.dir()}
      type={showPassword ? "text" : "password"}
      labelPlacement="floating"
      fill="outline"
      clearInput
      clearOnEdit={false}
      {...field}
      {...rest}
    />
  );
};

export default PasswordField;

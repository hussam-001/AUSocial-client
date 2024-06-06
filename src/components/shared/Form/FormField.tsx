import { ComponentProps } from "react";
import { useTranslation } from "react-i18next";

import {
  IonCheckbox,
  IonInput,
  IonNote,
  IonRadio,
  IonRadioGroup,
  IonTextarea,
} from "@/overrides/ionic/react";
import {
  Controller,
  FieldValues,
  RegisterOptions,
  useFormContext,
} from "@/overrides/react-hook-form";
import i18n from "@/config/i18n";
import PasswordField from "./PasswordField";
import RichTextField from "./RichTextField";
import ImgPicker from "./ImgPicker";

interface IFormFieldProps
  extends Omit<ComponentProps<typeof IonInput>, "type"> {
  name: string;
  rules?: RegisterOptions<FieldValues>;
  type:
    | "text"
    | "textarea"
    | "richtext"
    | "img-picker"
    | "password"
    | "checkbox"
    | "email"
    | "tel"
    | "radio"
    | "number"
    | "date"
    | "time"
    | "datetime-local";
  textareaProps?: ComponentProps<typeof IonTextarea>;
  radioProps?: ComponentProps<typeof IonRadio>;
  [key: string]: any;
}

const getErrorMessage = (error?: any) => {
  const { t } = i18n;
  if (error?.message) return error?.message;
  switch (error?.type) {
    case "required":
      return t("COMMON.FIELD_IS_REQUIRED");
    case "minLength":
      return t("COMMON.FIELD_MIN_LENGTH", { length: error?.types?.minLength });
    case "maxLength":
      return t("COMMON.FIELD_MAX_LENGTH", { length: error?.types?.maxLength });
    case "min":
      return t("COMMON.FIELD_MIN", { min: error?.types?.min });
    case "max":
      return t("COMMON.FIELD_MAX", { max: error?.types?.max });
    case "validate":
      return error?.message;
    case "pattern":
    default:
      return null;
  }
};

const getValidationPattern = (type: string) => {
  const { t } = i18n;
  switch (type) {
    case "email":
      return {
        pattern: {
          value: /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^\s@ \t\r\n]+$/,
          message: t("COMMON.INVALID_INPUT"),
        },
      };
    case "price": {
      return {
        min: {
          value: 0,
          message: t("COMMON.INVALID_INPUT"),
        },
      };
    }
    case "password": {
      return {
        minLength: { value: 6, message: t("COMMON.FIELD_MIN_LENGTH") },
        maxLength: { value: 18, message: t("COMMON.FIELD_MAX_LENGTH") },
      };
    }
    default:
      return {};
  }
};
// TODO: check this
const getValidationClassNames = (fieldState?: any) => {
  const { invalid, isTouched } = fieldState;
  return `${invalid ? "ion-invalid" : "ion-valid"} ${
    !isTouched ? "" : "ion-touched"
  } ion-touched`;
};

const FormField = (fieldProps: IFormFieldProps) => {
  const { i18n } = useTranslation();
  const { name, type, rules, label, className, ...rest } = fieldProps;
  const { register, getFieldState, formState } = useFormContext();
  const defaultRules = getValidationPattern(type);
  const field = register(name, {
    ...defaultRules,
    ...rules,
  } as RegisterOptions<FieldValues>);
  const fieldState = getFieldState(name, formState);
  const errorText = getErrorMessage(fieldState.error);
  const validationClassNames = getValidationClassNames(fieldState);
  const labelComponent = !label ? (
    <></>
  ) : (
    <div slot="label">
      {label} {rules?.required && <span>*</span>}
    </div>
  );

  let fieldComponent = null;
  switch (type) {
    case "password":
      fieldComponent = (
        <PasswordField
          className={`${validationClassNames} ${className}`}
          field={field}
          errorText={errorText}
          onIonChange={field.onChange}
          onIonBlur={field.onBlur}
          {...rest}
        >
          {labelComponent}
        </PasswordField>
      );
      break;
    case "checkbox":
      fieldComponent = (
        <Controller
          name={name}
          rules={rules}
          render={({ field: { value, onChange } }) => (
            <>
              <IonCheckbox
                labelPlacement="end"
                aria-label={label}
                children={label}
                checked={value}
                onIonChange={(e) => onChange(e.detail.checked)}
                {...(rest as any)}
              />
              <br />
              <IonNote color="danger">{errorText}</IonNote>
            </>
          )}
        />
      );
      break;
    case "textarea":
      fieldComponent = (
        <IonTextarea
          dir={i18n.dir()}
          errorText={errorText}
          labelPlacement="floating"
          fill="outline"
          className={`${validationClassNames} ${className}`}
          aria-label={label}
          onIonChange={field.onChange}
          onIonBlur={field.onBlur}
          {...field}
          {...(fieldProps?.textareaProps ?? {})}
          // {...rest}
        >
          {labelComponent}
        </IonTextarea>
      );
      break;
    case "radio":
      fieldComponent = (
        <Controller
          name={name}
          rules={rules}
          render={({ field: { value, onChange } }) => (
            <IonRadioGroup
              value={value}
              onIonChange={(e) => onChange(e.detail.value)}
              {...(rest as any)}
            >
              {labelComponent}
              {fieldProps?.children}
              <br />
              <IonNote color="danger">{errorText}</IonNote>
            </IonRadioGroup>
          )}
        />
      );
      break;
    case "richtext":
      fieldComponent = (
        <RichTextField field={field} rules={rules} errorText={errorText} />
      );
      break;
    case "img-picker":
      fieldComponent = (
        <Controller
          name={name}
          rules={rules}
          render={({ field }) => (
            <ImgPicker
              field={field}
              label={label}
              errorMessage={errorText}
              {...fieldProps}
            />
          )}
        />
      );
      break;
    case "text":
    default:
      fieldComponent = (
        <IonInput
          dir={i18n.dir()}
          type={type}
          errorText={errorText}
          labelPlacement="floating"
          fill="outline"
          className={`${validationClassNames} ${className}`}
          aria-label={label}
          onIonChange={field.onChange}
          onIonBlur={field.onBlur}
          {...field}
          {...rest}
        >
          {labelComponent}
        </IonInput>
      );
      break;
  }

  return <div className={`form-field ${type} ${name}`}>{fieldComponent}</div>;
};

export default FormField;

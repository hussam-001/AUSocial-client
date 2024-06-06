import { HTMLAttributes, createElement, useMemo } from "react";

import { IonText } from "@/overrides/ionic/react";
import style from "./style.module.scss";

export interface ITextProps extends HTMLAttributes<HTMLIonTextElement> {
  variant?:
    | "h1"
    | "h2"
    | "h3"
    | "h4"
    | "h5"
    | "h6"
    | "span"
    | "body1"
    | "body2"
    | "subtitle";
  fontWeight?: "bold" | "normal";
  lineHeight?: string;
  ionTextClassName?: string;
}

const Text = ({
  color,
  className,
  ionTextClassName,
  children,
  variant = "span",
  fontWeight,
  lineHeight,
  style: htmlStyle,
  ...rest
}: ITextProps) => {
  const isBodyText = useMemo(
    () => ["body1", "body2", "subtitle"].includes(variant),
    [variant],
  );

  return (
    <IonText
      color={color}
      className={`${style.text} ${ionTextClassName}`}
      {...rest}
    >
      {createElement(
        isBodyText ? "p" : variant,
        {
          className: `
          ${!isBodyText ? "" : `${variant}-text`}
          ${className}
          `,
          style: {
            fontWeight,
            lineHeight,
            ...htmlStyle,
          },
        },
        children,
      )}
    </IonText>
  );
};

export default Text;

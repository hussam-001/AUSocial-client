import { IonImg } from "@/overrides/ionic/react";
import style from "./style.module.scss";
import { backendApiUrl } from "@/constants";
import { getBackendUrl } from "@/config";

type Format = "thumbnail" | "small" | "medium" | "large";

type ImgProps = React.ComponentProps<typeof IonImg> & {
  format?: Format;
};

const avatarPlaceholder = "/assets/svg/avatar-placeholder.svg";

function getFormat(src: any, format?: Format) {
  const backendUrl = getBackendUrl();
  const url =
    typeof src === "string"
      ? src
      : (format ? (src?.formats && src?.formats[format]) ?? src : src)?.url;
  if (!url) return avatarPlaceholder;
  return url.startsWith("/") ? backendUrl + url : url;
}

export default function Img({
  src,
  format,
  alt,
  className,
  ...rest
}: ImgProps) {
  return (
    <IonImg
      alt={alt}
      src={getFormat(src, format)}
      placeholder="blur"
      className={`${style.ionImage} ${className}`}
      {...rest}
    />
  );
}

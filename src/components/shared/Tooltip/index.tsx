import Tippy, { TippyProps } from "@tippyjs/react";
import "tippy.js/dist/tippy.css";

import i18n from "@/config/i18n";

const Tooltip = ({ children, className, ...props }: TippyProps) => {
  return (
    <Tippy
      interactive
      appendTo={document.body}
      {...props}
      className={`${i18n.language !== "ar" ? "" : "arabic"} ${className}`}
    >
      <span>{children}</span>
    </Tippy>
  );
};
export default Tooltip;

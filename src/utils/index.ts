import clsx from "clsx";

export * from "@/utils/date";
export * from "@/utils/sanitize";
export * from "@/utils/price";

export const getFullName = (props: any): string => {
  return [props?.firstName, props?.lastName].filter(Boolean).join(" ");
};
export const cn = (...args: Parameters<typeof clsx>) => clsx(...args);

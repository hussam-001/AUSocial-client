import style from "./style.module.scss";

const Center = ({ children, ...rest }: any) => {
  return (
    <div className={style.centerContent} {...rest}>
      {children}
    </div>
  );
};
export default Center;

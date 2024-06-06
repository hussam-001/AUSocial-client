import { MODALS } from "@/constants/routes";
import { useHistory, useLocation } from "@/overrides/react-router";

const useModal = ({ key }: { key: string }) => {
  const history = useHistory();
  const { modals } = history.location.searchParams;
  const data = modals?.[key];
  const isOpen = Boolean(data);

  const open = (data?: any) => {
    return history.push({
      searchParams: {
        modals: {
          ...modals,
          [key]: {
            isOpen: true,
            ...data,
          },
        },
      },
    });
  };

  const close = () => {
    return history.push({
      searchParams: {
        modals: {
          ...modals,
          [key]: undefined,
        },
      },
    });
  };

  return {
    data,
    isOpen,
    open,
    close,
  };
};

export default useModal;

export const ModalsRenderer = () => {
  const { searchParams } = useLocation();
  return Object.keys(searchParams?.modals || {}).map((key: any) => {
    const Modal = MODALS?.[key]?.component;
    if (!Modal) return null;
    return <Modal key={key} />;
  });
};

import { useForm } from "react-hook-form";

const defaultFormOptions: any = {
  mode: "all",
  reValidateMode: "onBlur",
  criteriaMode: "all",
};

const useCustomForm = (formOption?: Partial<any>) => {
  return useForm({
    ...defaultFormOptions,
    ...formOption,
  });
};

export default useCustomForm;

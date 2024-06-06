import { FormProvider, UseFormReturn } from "@/overrides/react-hook-form";
import { IonCol, IonRow } from "@/overrides/ionic/react";
import FormField from "./FormField";

const TForm = ({
  methods,
  fields,
  onSubmit,
  children,
}: {
  methods: UseFormReturn;
  onSubmit: (data: any) => void;
  fields?: any[];
  children?: React.ReactNode;
}) => (
  <FormProvider {...methods}>
    <form onSubmit={methods.handleSubmit(onSubmit)}>
      {fields && (
        <IonRow className="ion-justify-content-between">
          {fields?.map((fieldProps: any) => {
            return (
              <IonCol key={fieldProps.name} {...fieldProps.sizes}>
                <FormField key={fieldProps.name} {...fieldProps} />
              </IonCol>
            );
          })}
        </IonRow>
      )}
      {children}
    </form>
  </FormProvider>
);

export default TForm;

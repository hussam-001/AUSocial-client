import MDEditor, {
  bold,
  codeEdit,
  codeLive,
  codePreview,
  italic,
  link,
  quote,
  title,
} from "@uiw/react-md-editor";

import { IonNote } from "@/overrides/ionic/react";
import { Controller } from "@/overrides/react-hook-form";

const RichTextField = ({ field, rules, errorText }: any) => {
  return (
    <Controller
      name={field.name}
      rules={rules}
      render={({ field }) => (
        <div>
          <MDEditor
            {...field}
            preview="edit"
            commands={[bold, italic, title, quote, link]}
            extraCommands={[codeEdit, codeLive, codePreview]}
            visibleDragbar={false}
            className="mb-2"
            height={300}
          />
          <IonNote color="danger">{errorText}</IonNote>
        </div>
      )}
    />
  );
};

export default RichTextField;

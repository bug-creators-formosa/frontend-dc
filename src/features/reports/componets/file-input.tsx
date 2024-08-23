import {
  FormControl,
  FormDescription,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/shadcn/ui/form";
import { Input } from "@/components/shadcn/ui/input";
import { ChangeEvent, ComponentProps, useState } from "react";

type FileInputProps = Omit<ComponentProps<"input">, "onChange"> & {
  label?: string;
  description?: string;
  onChange: (f: File) => void;
  initialUrl?: string;
};

export function FileInput(props: FileInputProps) {
  const [previewImage, setPreviewImage] = useState<string | null>(
    props.initialUrl ?? null
  );
  const { onChange, ...rest } = props;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    // @ts-expect-error The input is of type file
    const file = e.target.files[0];
    if (!file) return;

    onChange?.(file);

    const fileUrl = URL.createObjectURL(file);

    setPreviewImage(fileUrl);
  };

  return (
    <>
      {previewImage && <img src={previewImage} className="max-h-40" />}
      <FormItem>
        <FormLabel>{props.label}</FormLabel>
        <FormControl>
          <Input
            type="file"
            placeholder="Una imagen relacionada a la denuncia"
            onChange={handleChange}
            {...rest}
          />
        </FormControl>
        <FormDescription>{props.description}</FormDescription>
        <FormMessage />
      </FormItem>
    </>
  );
}

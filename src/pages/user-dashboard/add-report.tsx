import { Button } from "@/components/shadcn/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/shadcn/ui/form";
import { Input } from "@/components/shadcn/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/shadcn/ui/select";
import { getReportTypes } from "@/features/reports/services/report-types";
import { createReport } from "@/features/reports/services/user-reports";
import FullScreenSpinner from "@/features/ui/fullscreen-spinner";
import { useMutation, useQuery } from "@tanstack/react-query";
import { ChangeEvent, ComponentProps, useState } from "react";

export default function AddReport() {
  return (
    <main className="px-7 py-6 overflow-y-scroll max-h-full">
      <hgroup className="flex justify-between items-center">
        <h1 className="text-4xl font-sans-accent mb-6">
          Reporta un problema en tu ciudad
        </h1>
      </hgroup>
      <div className="grid p-2 gap-3">
        <ReportForm />
      </div>
    </main>
  );
}

const formSchema = z.object({
  title: z
    .string()
    .min(1, {
      message: "El título es requerido",
    })
    .max(255, {
      message: "El título no debe ser tan largo",
    }),
  description: z
    .string()
    .min(1, {
      message: "La descripción es requerida",
    })
    .max(9999, {
      message: "La descripción no puede ser tan larga",
    }),
  report_type_id: z.string({
    message: "El tipo es requerido",
  }),
  image: z.instanceof(File),
  address: z.string({
    message: "Por favor mencione la dirección",
  }),
});

export function ReportForm() {
  const {
    data: reportTypes,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["report", "types"],
    queryFn: () => getReportTypes(),
  });

  const { error: mutationError, mutateAsync } = useMutation({
    mutationKey: ["report"],
    mutationFn: createReport,
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      address: "",
    },
  });

  if (isLoading) {
    return <FullScreenSpinner />;
  }

  if (error) {
    return <p>Ha ocurrido un error: {error.message}</p>;
  }

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    await mutateAsync(values);
  }

  return (
    <>
      {mutationError && (
        <FormDescription>{mutationError.message}</FormDescription>
      )}
      <Form {...form}>
        <form
          noValidate
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8"
        >
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Título</FormLabel>
                <FormControl>
                  <Input placeholder="Título de una denuncia" {...field} />
                </FormControl>
                <FormDescription>
                  ¿Qué deseas denunciar en pocas palabras?
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Descripción</FormLabel>
                <FormControl>
                  <Input
                    placeholder="La descripción de lo que has visto"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Pon detalles acerca de la problemática
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FileInput
            name="image"
            label="Una imagen adjunta"
            description="Pon detalles acerca de la problemática"
            placeholder="Una imagen relacionada a la denuncia"
            onChange={(f) => {
              form.setValue("image", f);
            }}
          />
          <FormField
            control={form.control}
            name="report_type_id"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tipo</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar un tipo" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {reportTypes?.map((type) => {
                      return (
                        <SelectItem value={type.report_type_id}>
                          {type.name}
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
                <FormDescription></FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Dirección</FormLabel>
                <FormControl>
                  <Input placeholder="Dirección" {...field} />
                </FormControl>
                <FormDescription>¿A qué dirección debemos ir?</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button disabled={form.formState.isLoading} type="submit">
            Enviar
          </Button>
        </form>
      </Form>
    </>
  );
}

type FileInputProps = Omit<ComponentProps<"input">, "onChange"> & {
  label?: string;
  description?: string;
  onChange: (f: File) => void;
};

function FileInput(props: FileInputProps) {
  const [previewImage, setPreviewImage] = useState<string | null>(null);
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
      {previewImage && <img src={previewImage} />}
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

import { Button } from "@/components/shadcn/ui/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteReport } from "../services/user-reports";

export default function DeleteButton({ report_id }: { report_id: string }) {
  const { mutateAsync, isPending } = useMutation({
    mutationFn: deleteReport,
    mutationKey: ["reports", "delete", report_id],
  });
  const client = useQueryClient();

  const handleDelete = async (report_id: string) => {
    await mutateAsync({ report_id });
    await client.invalidateQueries({
      queryKey: ["user", "reports"],
    });
  };
  return (
    <Button
      variant="destructive"
      disabled={isPending}
      onClick={() => handleDelete(report_id)}
    >
      Eliminar
    </Button>
  );
}

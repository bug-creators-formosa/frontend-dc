import useAuth from "@/features/auth/hooks/use-auth";
import { ReportForm } from "@/features/reports/componets/report-form";
import { createReport } from "@/features/reports/services/user-reports";
import { useMutation } from "@tanstack/react-query";
import { ArrowLeft } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

export default function AddReport() {
  const { isAdmin } = useAuth();
  const navigate = useNavigate();
  const { mutateAsync } = useMutation({
    mutationKey: ["reports"],
    mutationFn: createReport,
  });

  return (
    <main className="px-2 md:px-7 p py-6 overflow-y-scroll max-h-full">
      <hgroup className="flex justify-start items-center">
        <div className="flex items-center h-full">
          <Link to={`/dashboard/reports/${isAdmin ? "admin" : "user"}`}>
            <ArrowLeft />
          </Link>
        </div>
        <div className="flex items-center">
          <h1 className="text-4xl font-sans-accent">Crea un reclamo</h1>
        </div>
      </hgroup>
      <div className="grid p-2 gap-3">
        <ReportForm
          onSubmit={async (values) => {
            if (!values) return;
            await mutateAsync({
              ...values,
              image: values.image ?? null,
            });
            navigate(`/dashboard/reports/${isAdmin ? "admin" : "user"}`);
          }}
        />
      </div>
    </main>
  );
}

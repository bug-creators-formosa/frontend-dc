import useAuth from "@/features/auth/hooks/use-auth";
import { ReportForm } from "@/features/reports/componets/report-form";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

export default function AddReport() {
  const { isAdmin } = useAuth();
  return (
    <main className="px-2 md:px-7 p py-6 overflow-y-scroll max-h-full">
      <hgroup className="flex justify-start items-center">
        <div className="flex items-center h-full">
          <Link to={`/dashboard/reports/${isAdmin ? "admin" : "user"}`}>
            <ArrowLeft />
          </Link>
        </div>
        <div className="flex items-center">
          <h1 className="text-4xl font-sans-accent">Nuevo Reclamo</h1>
        </div>
      </hgroup>
      <div className="grid p-2 gap-3">
        <ReportForm />
      </div>
    </main>
  );
}

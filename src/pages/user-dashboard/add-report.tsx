import { ReportForm } from "@/features/reports/componets/report-form";

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

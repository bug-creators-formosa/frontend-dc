import { api } from "@/features/common/api";

export type ReportType = {
  report_type_id?: string;
  name: string;
  description: string;
  created_at: string;
  updated_at: string;
  deleted_at: null | string;
};

export async function getReportTypes() {
  try {
    const response = await api.get<ReportType[]>("/report-types");
    return response.data;
  } catch (err) {
    console.error("reportTypes error: ", err);
    throw err;
  }
}

export async function saveReportType(
  data: Pick<ReportType, "report_type_id" | "name" | "description">
) {
  try {
    if (data.report_type_id) {
      const response = await api.patch<ReportType>(
        `/report-types/${data.report_type_id}`,
        data
      );
      return response.data;
    }

    const response = await api.post<ReportType>("/report-types", data);
    return response.data;
  } catch (err) {
    console.error("createReportType error: ", err);
    throw err;
  }
}

type ReportTypeByState = {
  [x in string]: {
    closed: number;
    "in progress": number;
    solved: number;
    opened: number;
  };
};

export async function reportTypesByState() {
  //
  try {
    //
    const response = await api.get<ReportTypeByState>("/report-types/by-state");
    return response.data;
  } catch (err) {
    console.error("getUsersByMonth error: ", err);
    throw err;
  }
}

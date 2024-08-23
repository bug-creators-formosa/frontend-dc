import { api } from "@/features/common/api";

type ReportTypeMostReported = {
  type_name: string;
  reports: number;
};

export async function getReportTypesMostReported() {
  try {
    //
    const response = await api.get<ReportTypeMostReported[]>(
      "/report-types/most-reported"
    );
    return response.data;
  } catch (err) {
    console.error("getUsersByMonth error: ", err);
    throw err;
  }
}

type ReportByStateAndMonth = {
  "8-2024": {
    opened: number;
  };
};

export async function getReportsByStateAndMonth() {
  try {
    const response = await api.get<ReportByStateAndMonth>(
      "/reports/by-state-and-month"
    );

    return response.data;
  } catch (err) {
    console.error("getReportTypesMostReported error: ", err);
    throw err;
  }
}

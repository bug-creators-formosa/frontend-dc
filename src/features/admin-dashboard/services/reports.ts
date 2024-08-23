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

    console.log({ rp: response.data });

    return response.data;
  } catch (err) {
    console.error("getUsersByMonth error: ", err);
    throw err;
  }
}

type ReportsByMonth = {
  reports: number;
  month_date: string;
  year: number;
  month: number;
};

export async function getReportsByMonth() {
  //reports/by-month
  try {
    const response = await api.get<ReportsByMonth[]>("/reports/by-month");
    return response.data;
  } catch (err) {
    console.error("getReportTypesMostReported error: ", err);
    throw err;
  }
}

type ReportByStateAndMonth = {
  [x in string]: {
    closed: number;
    "in progress": number;
    solved: number;
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

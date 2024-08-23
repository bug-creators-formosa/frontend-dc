import { api } from "@/features/common/api";

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

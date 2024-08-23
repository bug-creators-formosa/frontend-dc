import { api } from "@/features/common/api";

type GetReportTypesReponse = {
    report_type_id: string,
    name: string,
    description: string
}

export async function getReportTypes() {

    try {
        const response = await api.get<GetReportTypesReponse[]>(
            `/report-types`
        );
        return response.data;
    } catch (err) {
        console.error("getReports error: ", err);
        throw err;
    }
}
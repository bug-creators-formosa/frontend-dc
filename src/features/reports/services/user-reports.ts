import { User } from "@/features/auth/interfaces/user";
import { api } from "@/features/common/api";
import { ReportState } from "../consts/report-states";

type GetReportsResponse = {
    title: string
    description: string,
    address: string,
    state: ReportState,
    user: User
    type: {
        report_type_id: string,
        name: string,
        description: string
    },
    report_id: string,
    image_url?: string,
    state_change_at: string
}[]

export async function getReportsByUser() {
    try {
        const response = await api.get<GetReportsResponse>(
            `/users/my-reports`
        );
        return response.data.map(report => {
            return {
                ...report,
                // TODO: Este es una solución temporal al 
                // hecho de que hay reportes sin imagen
                // pero con una URL no nula
                image_url: report.image_url?.includes("undefined") ? null : report.image_url,
                state_change_at: new Date(report.state_change_at)
            }
        });
    } catch (err) {
        console.error("getReports error: ", err);
        throw err;
    }
}

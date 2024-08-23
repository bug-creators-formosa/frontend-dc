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
}

export async function getReportsByUser() {
    try {
        const response = await api.get<GetReportsResponse[]>(
            `/users/my-reports`
        );
        return response.data.map(report => {
            return {
                ...report,
                image_url: report.image_url?.includes("undefined") ? null : report.image_url,
                state_change_at: new Date(report.state_change_at)
            }
        });
    } catch (err) {
        console.error("getReports error: ", err);
        throw err;
    }
}

export async function getReports() {
    try {
        const response = await api.get<GetReportsResponse[]>(
            `/reports`
        );
        return response.data.map(report => {
            return {
                ...report,
                state_change_at: new Date(report.state_change_at)
            }
        });
    } catch (err) {
        console.error("getReports error: ", err);
        throw err;
    }
}

type GetReportParams = { report_id: string };

export async function getOneReport(params: GetReportParams) {
    try {
        const response = await api.get<GetReportsResponse>(
            `/reports/${params.report_id}`
        );
        const report = response.data;
        return {
            ...report,
            state_change_at: new Date(report.state_change_at)
        }
    } catch (err) {
        console.error("getReports error: ", err);
        throw err;
    }
}

export type CreateReportParams = {
    title: string,
    description: string,
    report_type_id: string,
    address: string,
    image: File
};

export async function createReport(params: CreateReportParams) {
    try {
        const formData = new FormData();
        formData.append("title", params.title);
        formData.append("description", params.description);
        formData.append("address", params.address);
        formData.append("report_type_id", params.report_type_id);
        formData.append("image", params.image);
        const response = await api.post(
            `/reports/`,
            formData
        );
        return response.data;
    } catch (err) {
        console.error("createReport error: ", err);
        throw err;
    }
}

export async function deleteReport(params: { report_id: string }) {
    try {
        const response = await api.delete(
            `/reports/${params.report_id}`,
        );
        return response.data;
    } catch (err) {
        console.error("deleteReports error: ", err);
        throw err;
    }
}


export async function changeReportState(params: { report_id: string, state: ReportState }) {
    try {
        const response = await api.patch(
            `/reports/${params.report_id}/${params.state}`,
        );
        return response.data;
    } catch (err) {
        console.error("changeReportState error: ", err);
        throw err;
    }
}
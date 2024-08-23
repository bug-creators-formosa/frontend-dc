import { User } from "@/features/auth/interfaces/user";
import { ReportState } from "../consts/report-states";

export type Report = {
    report_id: string;
    title: string,
    description: string,
    address: string,
    type: { report_type_id: string, title: string, description: string };
    image_url: string
    state: ReportState,
    user: User,
    state_change_at: Date,
    created_at: Date,
    updated_at: Date,
    deleted_at: Date;
}
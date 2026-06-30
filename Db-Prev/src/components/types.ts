import { Course } from "../../models/Course.ts";


export type Course = {
	courseid: number;
	code: string;
	title: string;
	crhr: number;
	semester: number;
};

import { use, useActionState } from "react";
import { api } from "../api";
import type { Course } from "./types";

type Props = {
	courseid: number;
	updateCourse: (course: Course) => void;
};

type ActionState = {
	success: boolean;
	error: string | null;
}

const coursePromiseCache = new Map<number, Promise<Course>>();

function getCourseById(courseid: number): Promise<Course> {
	if (!coursePromiseCache.has(courseid)) {
		const promise = api.get(`/api/courses/${courseid}`).then((res) => res.data as Course);
		coursePromiseCache.set(courseid, promise);
	}
	return coursePromiseCache.get(courseid)!;
}

function CourseForm({ courseid, updateCourse }: Props) {
	// Fetch initial course data with use() hook from the cache
	const initialCourse = use(getCourseById(courseid));

	// Define the submit action for useActionState
	const [state, formAction, isPending] = useActionState(
		async (_prevState: ActionState, formData: FormData) => {
			const updatedCourse: Course = {
				courseid: Number(formData.get("courseid")),
				code: formData.get("code") as string,
				title: formData.get("title") as string,
				crhr: Number(formData.get("crhr")),
				semester: Number(formData.get("semester")),
			};

			try {
				const response = await api.post(`/api/courses/${courseid}`, updatedCourse);
				// Invalidate the cache for this course so future selects load the new data
				coursePromiseCache.delete(courseid);
				updateCourse(response.data);
				return { success: true, error: null };
			} catch (err: unknown) {
				if (err instanceof Error) {
					return { success: false, error: err.message };
				}
				return { success: false, error: "Failed to update course" };
			}
		},
		{ success: false, error: null }
	);

	return (
		<form action={formAction}>
			<table>
				<tbody>
					<tr>
						<th>Id :</th>
						<td>
							<input type="text" name="courseid" defaultValue={initialCourse.courseid} readOnly size={2} />
						</td>
					</tr>
					<tr>
						<th>Code :</th>
						<td>
							<input type="text" name="code" defaultValue={initialCourse.code} size={4} />
						</td>
					</tr>
					<tr>
						<th>Title :</th>
						<td>
							<textarea name="title" defaultValue={initialCourse.title} rows={3} cols={30} />
						</td>
					</tr>
					<tr>
						<th>Credit Hours :</th>
						<td>
							<input type="text" name="crhr" defaultValue={initialCourse.crhr} size={2} />
						</td>
					</tr>
					<tr>
						<th>Semester :</th>
						<td>
							<input type="text" name="semester" defaultValue={initialCourse.semester} size={2} />
						</td>
					</tr>
					<tr>
						<td colSpan={2}>
							<button type="submit" disabled={isPending}> {isPending ? "Saving..." : "Save"} </button>
						</td>
					</tr>
				</tbody>
			</table>
			{state.error && <div style={{ color: "red", marginTop: "10px" }}>{state.error}</div>}
		</form>
	);
}

export default CourseForm;
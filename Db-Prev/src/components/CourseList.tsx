import { use, useState, Suspense } from "react";
import { api } from "../api";
import type { Course } from "./types";
import CourseForm from "./CourseForm";

const coursesPromise = api.get("/api/courses").then((res) => res.data as Course[]);

function CourseTable() {
	const initialCourses = use(coursesPromise);
	const [courses, setCourses] = useState<Course[]>(initialCourses);
	const [courseid, setCourseId] = useState<number>(0);

	const handleClick = (courseid: number) => {
		setCourseId(courseid);
	};

	const updateCourse = (course: Course) => {
		setCourses((prev: Course[]) => {
			return prev.map((c: Course) => c.courseid === course.courseid ? course : c);
		});
		setCourseId(0);
	};

	return (
		<div style={{ display: "flex", gap: "20px" }}>
			<div>
				<table>
					<thead>
						<tr>
							<th>Id</th>
							<th>Code</th>
							<th>Title</th>
							<th>Credit Hours</th>
							<th>Semester</th>
						</tr>
					</thead>
					<tbody>
						{courses.map((course: Course) => (
							<tr key={course.courseid}>
								<td>{course.courseid}</td>
								<td>{course.code}</td>
								<td>
									<a href="#1" onClick={() => handleClick(course.courseid)}>
										{course.title}
									</a>
								</td>
								<td>{course.crhr}</td>
								<td>{course.semester}</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
			<div>
				{courseid !== 0 && (
					<Suspense fallback={<div>Loading Course...</div>}>
						<CourseForm key={courseid} courseid={courseid} updateCourse={updateCourse} />
					</Suspense>
				)}
			</div>
		</div>
	);
}

function CourseList() {
	return (
		<Suspense fallback={<div>Loading courses...</div>}>
			<CourseTable />
		</Suspense>
	);
}

export default CourseList;

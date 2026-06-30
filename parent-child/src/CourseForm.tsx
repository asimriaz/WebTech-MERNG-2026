/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useActionState, useState } from "react";
import data from "./courses.json";
import type { Course } from "./types";

type Props = {
    getCourse: (course: Course) => void;
}


export default function CourseForm({ getCourse }: Props) {
	const [courses, setCourses] = useState<Course[]>(data);

	const searchCourseAction = async (prevState: string | null, formData: FormData) => {
		const code = (formData.get("code") as string).trim().toUpperCase();
        if(code){
            const course = courses.find((c) => c.code === code);
            console.log(typeof getCourse)
            getCourse({...course, reg: false} as Course);
            return code;
        }

        return null;

	};

	const [actionState, formAction] = useActionState(searchCourseAction, null);

	return (
		<>
			<form action={formAction}>
				<input
					type="text"
					name="code"
					required
					placeholder="Enter course code"
					style={{
						padding: "10px 16px",
						borderRadius: "8px",
						border: "2px solid #e2e8f0",
						fontSize: "15px",
						outline: "none",
						transition: "all 0.2s ease-in-out",
						width: "260px",
						backgroundColor: "#fff",
						color: "#1e293b",
					}}
				/>
				{/* {actionState && <p>Course found: {actionState}</p>} */}
			</form>
		</>
	);
}

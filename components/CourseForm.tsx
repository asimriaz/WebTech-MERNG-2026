import { useEffect, useState } from "react";
import { api } from "../api";
import type { Course } from "./types";

type Props = {
    courseid: number;
    updateCourse: (course: Course) => void;
}

function CourseForm({ courseid, updateCourse }: Props) {
    const [course, setCourse] = useState<Course>({} as Course);

    async function getCourseById(courseid: number) {
        const response = (await api.get(`/api/courses/${courseid}`)).data;
        return response;
    }

    useEffect(() => {
        getCourseById(courseid).then((course) => {
            setCourse(course);
        })

    }, [courseid])

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        if (name === "courseid") return;
        setCourse({ ...course, [name]: value })
    }

    async function handelSave(): Promise<void> {
        const response = await api.post(`/api/courses/${courseid}`, course);
        updateCourse(response.data);
    }

    return (
        <>
            <table>
                <tbody>
                    <tr>
                        <th>Id :</th>
                        <td>
                            <input type="text" value={course.courseid ?? 0} readOnly size={2} />
                        </td>
                    </tr>
                    <tr>
                        <th>Code :</th>
                        <td>
                            <input type="text" value={course.code ?? ""} name="code" onChange={handleOnChange} size={4} />
                        </td>
                    </tr>
                    <tr>
                        <th>Title :</th>
                        <td>
                            <textarea value={course.title ?? ""} rows={3} cols={30} onChange={handleOnChange} name="title" />
                        </td>
                    </tr>
                    <tr>
                        <th>Credit Hours :</th>
                        <td>
                            <input type="text" value={course.crhr ?? 0} name="crhr" onChange={handleOnChange} size={2} />
                        </td>
                    </tr>
                    <tr>
                        <th>Semester :</th>
                        <td>
                            <input type="text" value={course.semester ?? 0} name="semester" onChange={handleOnChange} size={2} />
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={2}>
                            <button onClick={handelSave}>Save</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </>
    )
}

export default CourseForm
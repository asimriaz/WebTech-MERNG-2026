import { useEffect, useState } from "react";
import { api } from "../api";
import type { Course } from "./types";
import CourseForm from "./CourseForm";

function CourseList() {
    const [courses, setCourses] = useState<Course[]>([]);
    const [courseid, setCourseId] = useState<number>(0);

    async function fetchData() {
        const response = (await api.get("/api/courses")).data;
        return response;
    }

    useEffect(() => {
        fetchData().then((courses) => {
            setCourses(courses);
        });
    }, []);

    const handleClick = (courseid: number) => {
        setCourseId(courseid);
    };

    const updateCourse = (course: Course) => {
        setCourses((prev: Course[]) => {
            return prev.map((c: Course) => c.courseid === course.courseid ? course : c)
        })
        setCourseId(0);
    }

    return (
        <>
            <div style={{ display: "flex", gap: '20px' }}>
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
                                        <a href="#1" onClick={() => handleClick(course.courseid)}>{course.title}</a>
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
                        <CourseForm courseid={courseid} updateCourse={updateCourse} />
                    )}
                </div>
            </div>
        </>
    );
}

export default CourseList;

/* eslint-disable @typescript-eslint/no-unused-expressions */
import React, { useState } from "react";
import CourseForm from "./CourseForm";
import type { Course } from "./types";

export default function CourseList() {
	const [offCrs, setOffCrs] = useState<Course[]>([]);
    const [msg, setMsg] = useState('');
    const [show, setShow] = useState('All')

	const getCourse = (course: Course) => {
		console.log(course);
        Object.keys(course).length === 1 
        ? setMsg('Course not found!') 
        : offCrs.some((c) => c.code === course.code)
            ? setMsg('Course already added!')
            : setOffCrs((prev) => [...prev, course]);
	};


    const handleCourseClick = (code: string) => {
        setOffCrs((prev) => prev.map((c) => c.code === code ? {...c, reg: !c.reg} : c));
    }

    const filteredCrs = show === 'Reg' 
        ? offCrs.filter(c => c.reg) 
        : show === 'Off' ? offCrs.filter(c => !c.reg) 
        : offCrs;

	return (
		<>
            <div style={{ color: 'red', marginBottom: '10px' }}>{msg}</div>
			<CourseForm getCourse={getCourse} />
			{filteredCrs.length > 0 && (
				<table>
                    <tbody>
					{filteredCrs.map((course, index) => {
						const color = course.reg ? "blue" : "#d3d3d3";
                        return (
							<tr key={index} style={{ color, cursor: 'pointer' }} onClick={() => handleCourseClick(course.code)}>
								<td>{course.code} {course.title}</td>
							</tr>
						);
					})}
                    </tbody>
				</table>
            
			)}
            <div>
                <button onClick={() => setShow('All')}>All</button>
                <button onClick={() => setShow('Reg')}>Registered</button>
                <button onClick={() => setShow('Off')}>Offered</button>
            </div>
		</>
	);
}

import React, { useActionState, useState, type ChangeEvent } from 'react'

type FormState = {
    firstName: string;
    lastName: string;
    comments: string;
    semester: string;
    employee: string;
    programs: string[];
}



function UserForm19() {
    const [formState, setformState] = useState<FormState>({
        firstName: '',
        lastName: '',
        comments: '',
        semester: '',
        employee: '',
        programs: []
    });


    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;

        if (type === 'checkbox') {
            setformState(prev => {
                const programs = prev.programs.includes(value)
                    ? prev.programs.filter(p => p != value) // Remove program from array
                    : [...prev.programs, value]             // Add program to array
                return { ...prev, programs };
            })
        } else {
            setformState(preState => ({ ...preState, [name]: value }));
        }
    }

    /*
        { firname: '', lastName: '' }
        {...preState, firstName : value, lastName : value}
    */

    const employee = { 'Full Time': "fulltime", Adjunct: 'adjunct', 'Visiting': 'visiting', Staff: 'staff', }
    const prgs = ['Computer Science', 'Mathematics', 'Physics', 'Chemistry', 'Statistics']

    const handleSubmit = async (prevState, formData: FormData) => {
        const data = {
            firstName: formData.get('firstName'),
            lastName: formData.get('lastName'),
            comments: formData.get('comments'),
            semester: formData.get('semester'),
            employee: formData.get('employee'),
            programs: formData.getAll('programs')
        }
        //await new Promise((resolve) => setTimeout(() => resolve, 2000))

        return {
            success: true,
            message: 'Form submitted successfully',
            submittedAt: new Date().toISOString(),
            data
        };
    }


    const [actionState, formAction, isPending] = useActionState(handleSubmit, formState)

    return (
        <>
            <div>
                <form action={formAction}>
                    <table>
                        <tbody>
                            <tr>
                                <th>First Name : </th>
                                <td>
                                    <input type="text" name='firstName' value={formState.firstName} onChange={handleChange} />
                                </td>
                            </tr>
                            <tr>
                                <th>Last Name : </th>
                                <td>
                                    <input type="text" name='lastName' value={formState.lastName} onChange={handleChange} />
                                </td>
                            </tr>
                            <tr>
                                <th>Comments : </th>
                                <td>
                                    <textarea name='comments' value={formState.comments} onChange={handleChange} />
                                </td>
                            </tr>
                            <tr>
                                <th>Semester : </th>
                                <td>
                                    <select name='semester' value={formState.semester} onChange={handleChange}>
                                        <option hidden value=""></option>
                                        <option value="Fall">Fall</option>
                                        <option value="Spring">Spring</option>
                                        <option value="Summer">Summer</option>
                                    </select>
                                </td>
                            </tr>
                            <tr>
                                <th>Employees : </th>
                                <td>
                                    {Object.entries(employee).map(([label, value]) => (
                                        <label key={value}>
                                            <input type="radio" name='employee' value={value} checked={formState.employee === value} onChange={handleChange} />
                                            {label}
                                        </label>
                                    ))}
                                </td>
                            </tr>
                            <tr>
                                <th>Programs : </th>
                                <td>
                                    {prgs.map(prg => (
                                        <label key={prg}>
                                            <input type="checkbox" name='programs' value={prg} checked={formState.programs.includes(prg)} onChange={handleChange} />
                                            {prg}
                                        </label>
                                    ))}
                                    <a href="#" onClick={(e) => {
                                        e.preventDefault();
                                        setformState(prev => ({
                                            ...prev,
                                            programs: prev.programs.length === prgs.length ? [] : prgs
                                        }))
                                    }}>{formState.programs.length === prgs.length ? "Unselect All" : "Select All"}</a>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <button type='submit' disabled={isPending}>
                                        {isPending ? "Submitting..." : "Submit"}
                                    </button>
                                    {actionState && <>
                                        <h3 style={{ color: actionState?.success ? "green" : "red" }}>{actionState.message}</h3>
                                        <p>Submitted At: {actionState.submittedAt}</p>
                                        <pre>{JSON.stringify(actionState.data, null, 3)}</pre>
                                    </>}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </form>
            </div>
            {/* <pre style={{ textAlign: "left" }}>{JSON.stringify(formState, null, 3)}</pre> */}
        </>
    )
}

export default UserForm19   
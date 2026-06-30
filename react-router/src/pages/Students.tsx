import { Link, NavLink, Outlet } from "react-router-dom"


function Students() {
    const students = [1, 2, 3, 4, 5, 6]

    return (
        <>
            <h2>Students</h2>
            <div style={{ display: 'flex' }}>
                <ol>
                    {students.map((id) => (
                        <li key={id}><NavLink to={`/students/${id}`} style={({ isActive }) => ({ backgroundColor: isActive ? 'aqua' : 'transparent', })}>Student {id}</NavLink></li>
                    ))}
                </ol>
                <div style={{ marginLeft: '100px' }}>
                    <Outlet />
                </div>
            </div>
        </>
    )
}

export default Students
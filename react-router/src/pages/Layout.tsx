import { NavLink, Outlet } from "react-router-dom"

function Layout() {
    return (
        <>
            <header>
                <h1>Header</h1>
            </header>
            <nav style={{ display: 'flex', gap: '10px' }}>
                <NavLink to="/" style={({ isActive }) => ({ backgroundColor: isActive ? 'aqua' : 'transparent', })} >Home</NavLink>
                {/* <NavLink to="/students" style={({ isActive }) => ({ backgroundColor: isActive ? 'aqua' : 'transparent', })} >Students</NavLink> */}
            </nav>
            <main>
                <Outlet />
            </main>
            <footer>
                <p>Footer</p>
            </footer>
        </>
    )
}

export default Layout
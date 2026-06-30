import { Link } from "react-router-dom"

function NotFound() {
    return (
        <>
            <h2>NotFound</h2>
            <Link to="/">Home using Link</Link>
            <br />
            <a href="/">Home using anchor tag</a>
        </>
    )
}

export default NotFound
import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"

function Home() {
    const [userName, setUserName] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()

    const handleLogin = () => {
        if (userName === "admin" && password === "1234") {
            navigate("/students", { state: { userName, password } })
        }
        else {
            alert("Invalid username or password")
        }
        console.log(userName, password)
    }
    return (
        <>
            <h2>Home</h2>
            <nav>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <table>
                        <tbody>
                            <tr>
                                <th>User Name : </th>
                                <td><input type="text" placeholder="Username" value={userName} onChange={(e) => setUserName(e.target.value)} /> </td>
                            </tr>
                            <tr>
                                <th>Password : </th>
                                <td><input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} /></td>
                            </tr>
                            <tr>
                                <th></th>
                                <td><button type="submit" onClick={handleLogin}>Login</button></td>
                            </tr>
                        </tbody>
                    </table>
                </ul>
            </nav>
        </>
    )
}

export default Home
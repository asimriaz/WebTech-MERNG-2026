import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Home from "./pages/Home"
import Students from "./pages/Students"
import NotFound from "./pages/NotFound"
import Student from "./pages/Student"
import Layout from "./pages/Layout"


const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        errorElement: <NotFound />,
        children: [
            {
                index: true,
                element: <Home />
            },
            {
                path: "/students",
                element: <Students />,
                children: [
                    {
                        path: "/students/:id",
                        element: <Student />,
                    },

                ]
            },
        ],

    }
])

function App() {
    return (
        <RouterProvider router={router} />
    )
}

export default App
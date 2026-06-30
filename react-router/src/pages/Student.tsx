import { useParams } from "react-router-dom"

function Student() {
    const params = useParams<{ id: string }>()
    return (
        <div>Student {params.id}</div>
    )
}

export default Student
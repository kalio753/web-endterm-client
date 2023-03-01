import { Link, Navigate, Outlet } from "react-router-dom"
import { useAuth } from "../hooks/useAuth"

export default function ProtectedLayout() {
    // const { user } = useAuth()

    // if (!user) {
    //     console.log("getout")
    //     return <Navigate to="/" />
    // }

    return (
        <div>
            <Outlet />
        </div>
    )
}

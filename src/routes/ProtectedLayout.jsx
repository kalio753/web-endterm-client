import { Link, Navigate, Outlet } from "react-router-dom"

export default function ProtectedLayout() {
    const isLogin = localStorage.getItem("token")
    if (!isLogin) {
        console.log("Not Authenticated")
        return <Navigate to="/" />
    }

    return (
        <div>
            <Outlet />
        </div>
    )
}

import { Link, Navigate, Outlet } from "react-router-dom"
import { useAuth } from "../hooks/useAuth"

export const UnProtecedLayout = () => {
    const { user } = useAuth()

    if (user) {
        return <Navigate to="/user/about" />
    }

    return (
        <div>
            <Outlet />
        </div>
    )
}

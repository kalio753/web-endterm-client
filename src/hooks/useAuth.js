import { createContext, useContext, useMemo } from "react"
import { useNavigate } from "react-router-dom"
import useLocalStorage from "use-local-storage"

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useLocalStorage("user", null)
    const navigate = useNavigate()

    const login = async (data) => {
        setUser(data)
        navigate("/user/about", { replace: true })
    }

    const logout = () => {
        setUser(null)
        navigate("/", { replace: true })
    }

    const value = useMemo(
        () => ({
            user,
            login,
            logout,
        }),
        [user]
    )

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

const AuthContext = createContext(AuthProvider)

export const useAuth = () => {
    return useContext(AuthContext)
}

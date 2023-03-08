import { message } from "antd"
import React from "react"
import { useNavigate } from "react-router-dom"
import { AxiosExpress } from "../../utils/axios"

const Verify = () => {
    const url = new URL(window.location.href)
    const searchParams = url.searchParams
    const token = searchParams.get("token")

    const navigate = useNavigate()

    AxiosExpress.post(`/api/user/verification`, { token }).then(({ data }) => {
        if (data.code === 200) {
            localStorage.setItem("token", data.token)
            navigate("/user/feeds")
        } else {
            message.warning(
                "Your verification email has expired, please login again to receive another email"
            )
            navigate("/login")
        }
    })
    return <div></div>
}

export default Verify

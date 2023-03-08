import { Checkbox, Input, Spin } from "antd"
import "./login.scss"
import React, { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import Theme from "../../assets/icon/login-theme.svg"
import Bottom1 from "../../assets/icon/login-bottom1.svg"
import Bottom2 from "../../assets/icon/login-bottom2.svg"
import { useAuth } from "../../hooks/useAuth"
import { AxiosExpress } from "../../../utils/axios"
import VerifyModal from "../../Components/VerifyModal/VerifyModal.jsx"

export default function Login({ toggleTheme }) {
    document.title = "Login"
    const navigate = useNavigate()

    const [userName, setUserName] = useState("")
    const [password, setPassword] = useState("")
    const [isRemember, setIsRemember] = useState(false)

    const [loading, setLoading] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [errorMsg, setErrorMsg] = useState(null)

    const toggleCheckBox = (e) => {
        setIsRemember(e.target.checked)
    }

    const showModal = () => {
        setIsModalOpen(true)
    }

    const submitOnEnter = (e) => {
        let code = e.keyCode
        if (code === 13) {
            handleOnSubmit()
        }
    }

    const handleOnSubmit = async () => {
        if (!userName || !password) {
            setErrorMsg("Field cannot be blank")
        } else {
            setLoading(true)
            AxiosExpress.post("/api/user/login", {
                userName,
                password,
                isRemember,
            }).then(({ data }) => {
                setLoading(false)
                setErrorMsg(null)
                if (data.code === 508) {
                    showModal()
                } else if (!data.success) {
                    setErrorMsg(data.data)
                } else {
                    localStorage.setItem("token", data.token)
                    navigate("/user/feeds")
                }
            })
        }
    }

    return (
        <section className="login">
            <div className="login-container" onKeyDown={submitOnEnter}>
                <h1 className="login-header">Sign in</h1>

                <div className="login-description">
                    Sign in and start your story right now!
                </div>

                <Input
                    placeholder="Username"
                    className="login-input"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    autoFocus={true}
                />

                <Input
                    placeholder="Password"
                    className="login-input"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                {errorMsg ? <div className="login-err">{errorMsg}</div> : null}

                <div className="login-option">
                    <Checkbox
                        onChange={toggleCheckBox}
                        checked={isRemember}
                        className="login-option-remember"
                    >
                        Remember me
                    </Checkbox>

                    <div className="login-option-nav">
                        <Link to="/user/about">Forgot password?</Link>
                    </div>
                </div>

                {loading ? (
                    <Spin className="login-spin" size="large" />
                ) : (
                    <button className="login-btn" onClick={handleOnSubmit}>
                        Login
                    </button>
                )}

                <div className="login-redirect">
                    Haven't join us yet?
                    <Link to="/signup" className="login-redirect-btn">
                        Click here
                    </Link>
                </div>
            </div>

            <div className="theme-btn" onClick={toggleTheme}>
                <img src={Theme} alt="" />
            </div>

            <img src={Bottom1} alt="" className="login-bottom1" />
            <img src={Bottom2} alt="" className="login-bottom2" />

            <VerifyModal
                isOpen={isModalOpen}
                setIsOpen={setIsModalOpen}
                user={userName}
            />
        </section>
    )
}

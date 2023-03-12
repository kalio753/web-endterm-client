import { Checkbox, Input, Modal, Spin } from "antd"
import "../Login/login.scss"
import "./signup.scss"
import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import Theme from "../../assets/icon/login-theme.svg"
import Bottom1 from "../../assets/icon/login-bottom1.svg"
import Bottom2 from "../../assets/icon/login-bottom2.svg"
import { AxiosExpress } from "../../../utils/axios"
import { validateEmail, validatePhoneNumber } from "../../../utils/helper"
import VerifyModal from "../../Components/VerifyModal/VerifyModal.jsx"

export default function Signup({ toggleTheme }) {
    document.title = "Signup"

    const PASSWORD_LIMITATION = 6

    const [userName, setUserName] = useState("")
    const [fullName, setFullName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [phone, setPhone] = useState("")

    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(false)

    const showModal = () => {
        setIsModalOpen(true)
    }

    const handleOnSubmit = () => {
        if (
            !userName ||
            !fullName ||
            !email ||
            !password ||
            !confirmPassword ||
            !phone
        ) {
            setError(`Field cannot be empty`)
        } else if (!validateEmail(email)) {
            setError(`Invalid email format, please try again`)
        } else if (!validatePhoneNumber(phone)) {
            setError(
                `Invalid phone number, phone must be at least 10 digit characters`
            )
        } else if (password.length < PASSWORD_LIMITATION) {
            setError(
                `Password must be at least ${PASSWORD_LIMITATION} characters`
            )
        } else if (password !== confirmPassword) {
            setError(`Password does not match, please try again`)
        } else {
            setError(null)
            setLoading(true)
            AxiosExpress.post("/api/user/signup", {
                userName,
                fullName,
                email,
                password,
                confirmPassword,
                phone,
            }).then(({ data }) => {
                setLoading(false)
                setError(null)
                if (!data.success) {
                    setError(data.data)
                } else {
                    console.log("Signup Success")
                    showModal()
                }
            })
        }
    }

    return (
        <section className="login">
            <div className="login-container signup-container">
                <h1 className="login-header">Sign up</h1>

                <div className="login-description">
                    Join us and begin to share your memories !
                </div>

                <div className="signup-input-section">
                    <div>
                        <Input
                            placeholder="Username"
                            className="login-input"
                            value={userName}
                            onChange={(e) => setUserName(e.target.value)}
                        />

                        <Input
                            placeholder="Email"
                            className="login-input"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div>
                        <Input
                            placeholder="Full name"
                            className="login-input"
                            type="text"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                        />

                        <Input
                            placeholder="Phone number"
                            className="login-input"
                            type="text"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                        />
                    </div>

                    <div>
                        <Input
                            placeholder="Password"
                            className="login-input"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />

                        <Input
                            placeholder="Confirm password"
                            className="login-input"
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </div>

                    {error ? <div className="login-err">{error}</div> : null}
                </div>

                {loading ? (
                    <Spin className="login-spin" size="large" />
                ) : (
                    <button
                        className="login-btn"
                        style={{ marginTop: 30 }}
                        onClick={handleOnSubmit}
                        // onClick={showModal}
                    >
                        {`Sign up`}
                    </button>
                )}

                <div className="login-redirect">
                    Already have an account?
                    <Link to="/login" className="login-redirect-btn">
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
                user={email}
            />
        </section>
    )
}

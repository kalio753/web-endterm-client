import { Checkbox, Input } from "antd"
import "./login.scss"
import React from "react"
import { Link, useNavigate } from "react-router-dom"
import Theme from "../../assets/icon/login-theme.svg"
import Bottom1 from "../../assets/icon/login-bottom1.svg"
import Bottom2 from "../../assets/icon/login-bottom2.svg"
import { useAuth } from "../../hooks/useAuth"

export default function Login({ toggleTheme }) {
    const navigate = useNavigate()

    const toggleCheckBox = (e) => {
        console.log(`checked = ${e.target.checked}`)
    }

    const loginBtnClicked = async () => {
        navigate("/user/about")
    }

    return (
        <section className="login">
            <div className="login-container">
                <h1 className="login-header">Sign in</h1>

                <div className="login-description">
                    Sign in and start your story right now!
                </div>

                <Input placeholder="Username" className="login-input" />

                <Input
                    placeholder="Password"
                    className="login-input"
                    type="password"
                />

                <div className="login-option">
                    <Checkbox
                        onChange={toggleCheckBox}
                        className="login-option-remember"
                    >
                        Remember me
                    </Checkbox>

                    <div className="login-option-nav">
                        <Link to="/user/about">Forgot password?</Link>
                    </div>
                </div>

                <button className="login-btn" onClick={loginBtnClicked}>
                    Login
                </button>

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
        </section>
    )
}

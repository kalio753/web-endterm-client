import { Checkbox, Input } from "antd"
import "../Login/login.scss"
import "./signup.scss"
import React from "react"
import { Link } from "react-router-dom"
import Theme from "../../assets/icon/login-theme.svg"
import Bottom1 from "../../assets/icon/login-bottom1.svg"
import Bottom2 from "../../assets/icon/login-bottom2.svg"

export default function Signup({ toggleTheme }) {
    return (
        <section className="login">
            <div className="login-container signup-container">
                <h1 className="login-header">Sign up</h1>

                <div className="login-description">
                    Join us and begin to share your memories !
                </div>

                <div className="signup-input-section">
                    <div>
                        <Input placeholder="Username" className="login-input" />

                        <Input placeholder="Email" className="login-input" />
                    </div>

                    <div>
                        <Input
                            placeholder="Password"
                            className="login-input"
                            type="password"
                        />

                        <Input
                            placeholder="Confirm password"
                            className="login-input"
                            type="password"
                        />
                    </div>
                </div>

                <button className="login-btn" style={{ marginTop: 40 }}>
                    Sign up
                </button>

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
        </section>
    )
}

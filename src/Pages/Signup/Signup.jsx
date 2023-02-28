import { Checkbox, Input } from "antd"
import "../Login/login.scss"
import React from "react"
import { Link } from "react-router-dom"
import Theme from "../../assets/icon/login-theme.svg"
import Bottom1 from "../../assets/icon/login-bottom1.svg"
import Bottom2 from "../../assets/icon/login-bottom2.svg"

export default function Signup({ toggleTheme }) {
    const toggleCheckBox = (e) => {
        console.log(`checked = ${e.target.checked}`)
    }

    return (
        <section className="login">
            <div className="login-container">
                <h1 className="login-header">Sign up</h1>

                <div className="login-description">
                    Join us and begin to share your memories !
                </div>

                <Input placeholder="Username" className="login-input" />

                <Input placeholder="Email" className="login-input" />

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

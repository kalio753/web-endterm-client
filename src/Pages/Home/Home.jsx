import { Checkbox, Input } from "antd"
import "../Login/login.scss"
import "./home.scss"
import React from "react"
import { Link, useNavigate } from "react-router-dom"
import Theme from "../../assets/icon/login-theme.svg"
import Bottom1 from "../../assets/icon/login-bottom1.svg"
import Bottom2 from "../../assets/icon/login-bottom2.svg"

const Home = ({ toggleTheme }) => {
    document.title = "Welcome"

    return (
        <section className="login home">
            <div className="home-container">
                <h1 className="home-header">WELCOME !</h1>

                <div className="home-description">
                    Begin your own story today and share it to your homies !
                </div>

                <div className="home-description" style={{ marginTop: 40 }}>
                    Join us now
                </div>

                <div className="home-btn-section">
                    <button className="home-btn">
                        <Link to="/signup" className="home-redirect-btn">
                            Sign up
                        </Link>
                    </button>
                    <button className="home-btn">
                        <Link to="/login" className="home-redirect-btn">
                            Sign in
                        </Link>
                    </button>
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

export default Home

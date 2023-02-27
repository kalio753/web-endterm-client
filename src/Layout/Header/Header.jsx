import React from "react"
import "./header.scss"

const Header = ({ toggleTheme, theme }) => {
    return (
        <section className={`header`}>
            <div className="logo">
                <img src="../../assets/logo.png" alt="" />
            </div>
            <div className="search">
                <input
                    type="text"
                    className="search-input"
                    placeholder="Search Facebook"
                />
            </div>
            <div className="user">User</div>
        </section>
    )
}

export default Header

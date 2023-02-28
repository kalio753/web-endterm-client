import React from "react"
import "./header.scss"
import Logo from '../../assets/images/logo.png'
import Avatar from '../../assets/images/avatar.jpg'
import SearchIcon from '../../assets/icon/search.svg'
import MessageIcon from '../../assets/icon/mess.svg'
import NotificationIcon from '../../assets/icon/notification.svg'

const Header = ({ toggleTheme, theme }) => {
    return (
        <section className={`header`}>
            <div className="logo">
                <img src={Logo} alt="" />
            </div>
            <div className="search">
                <input
                    type="text"
                    className="search-input"
                    placeholder="Search Facebook..."
                />
                <img src={SearchIcon} alt="" className="search-icon" />
            </div>
            <div className="user">
                <div className="user-mess">
                    <img src={MessageIcon} alt="" />
                </div>

                <div className="user-noti">
                    <img src={NotificationIcon} alt="" />
                </div>

                <div className="user-avatar">
                    <img src={Avatar} alt="" />
                </div>

            </div>
        </section>
    )
}

export default Header

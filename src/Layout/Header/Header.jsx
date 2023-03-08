import React, { useState } from "react"
import "./header.scss"
import Logo from "../../assets/images/logo.png"
import Avatar from "../../assets/images/avatar.jpg"
import SearchIcon from "../../assets/icon/search.svg"
import MessageIcon from "../../assets/icon/mess.svg"
import NotificationIcon from "../../assets/icon/notification.svg"
import { Link, Outlet, useNavigate } from "react-router-dom"
import { DownOutlined } from "@ant-design/icons"
import { Dropdown, Space } from "antd"
import GlobalSvgIcon from "../../Components/GlobalSvgIcon/GlobalSvgIcon.jsx"

const Header = ({ toggleTheme, theme }) => {
    const navigate = useNavigate()

    const [open, setOpen] = useState(false)
    const handleMenuClick = (e) => {
        if (e.key !== "1") {
            setOpen(false)
        }
    }
    const handleOpenChange = (flag) => {
        setOpen(flag)
    }

    const handleLogout = () => {
        localStorage.removeItem("token")
        navigate("/login")
    }

    const items = [
        {
            label: <div onClick={() => navigate("/user/profile")}>Profile</div>,
            key: "0",
        },
        {
            label: (
                <div onClick={() => toggleTheme()}>{`${
                    theme === "dark" ? "Light" : "Dark"
                } mode`}</div>
            ),
            key: "1",
        },
        {
            type: "divider",
        },
        {
            label: (
                <div style={{ color: "red" }} onClick={handleLogout}>
                    Log out
                </div>
            ),
            key: "3",
        },
    ]

    return (
        <>
            <section className={`header`}>
                <div className="logo">
                    <Link to="/">
                        <img src={Logo} alt="" />
                    </Link>
                </div>
                <div className="search">
                    <input
                        type="text"
                        className="search-input"
                        placeholder="Search for a user..."
                    />
                    <img src={SearchIcon} alt="" className="search-icon" />
                </div>
                <div className="user">
                    <GlobalSvgIcon url={MessageIcon} />
                    <GlobalSvgIcon url={NotificationIcon} />

                    <Dropdown
                        menu={{
                            items,
                            onClick: handleMenuClick,
                        }}
                        trigger={["click"]}
                        overlayClassName={`user-dropdown`}
                        onOpenChange={handleOpenChange}
                        open={open}
                    >
                        <div className="user-avatar">
                            <img src={Avatar} alt="" />
                        </div>
                    </Dropdown>
                </div>
            </section>

            <Outlet />
        </>
    )
}

export default Header

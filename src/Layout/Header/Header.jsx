import React, { useCallback, useState } from "react"
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
import { useDispatch, useSelector } from "react-redux"
import { getProfileMeSelector } from "../../redux/selector"
import { getProfileById } from "../../redux/slices/profileSlice"
import _debounce from "lodash/debounce"
import axios, { Axios } from "axios"
import FriendCard from "../../Components/FriendCard/FriendCard.jsx"
import DebounceSelect from "../../Components/DebounceSelect.jsx"

const Header = ({ toggleTheme, theme }) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const currUser = useSelector(getProfileMeSelector)
    const token = localStorage.getItem("token")
    const RESOURCE_URL =
        "http://ec2-18-181-190-3.ap-northeast-1.compute.amazonaws.com/"

    const [visible, setVisible] = useState(false)
    const [keyword, setKeyword] = useState("")
    const [dropdownOptions, setDropdownOptions] = useState([])

    function openDropdown() {
        setVisible(true)
    }

    function handleInputOnchange(e) {
        const { value } = e.target
        console.log(value, 123)
        setKeyword(value)
        debounceDropDown(value)
    }

    const debounceDropDown = useCallback(
        _debounce((nextValue) => fetchDropdownOptions(nextValue), 1000),
        []
    )

    function fetchDropdownOptions(key) {
        axios.get(`https://api.nationalize.io/?name=alo${key}`).then((res) => {
            console.log(res.country)
            setDropdownOptions(res.country)
        })
    }

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

    const handleNavigateToProfile = async () => {
        dispatch(getProfileById({ token, id: currUser.id }))
        navigate("/user/profile/" + currUser.id)
    }

    const items = [
        {
            label: <div onClick={handleNavigateToProfile}>Profile</div>,
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

    async function fetchUserList(username) {
        return fetch(
            `http://localhost:5000/api/user/search-friend?token=${token}&kw=${username}`,
            {
                method: "POST",
                body: JSON.stringify({ token: token, kw: username }),
            }
        )
            .then((response) => response.json())
            .then((body) => {
                console.log("body", body)
                return body.data.map((item) => ({
                    label: `${item.full_name}`,
                    value: item.id,
                }))
            })
    }

    return (
        <>
            <section className={`header`}>
                <div className="logo">
                    <Link to="/">
                        <img src={Logo} alt="" />
                    </Link>
                </div>
                <div className="search">
                    <DebounceSelect
                        // mode="tags"
                        showSearch
                        value={keyword}
                        fetchOptions={fetchUserList}
                        onChange={(data) => {
                            console.log("ula", data)
                            setKeyword(data)
                            dispatch(getProfileById({ token, id: data }))

                            navigate("/user/profile/" + data)
                            // anchor here
                        }}
                        style={{
                            width: "100%",
                        }}
                    />
                    {/* <input
                        type="text"
                        className="search-input"
                        placeholder="Search for a user..."
                        value={keyword}
                        onClick={openDropdown}
                        onChange={handleInputOnchange}
                    />

                    <img src={SearchIcon} alt="" className="search-icon" />

                    {visible ? (
                        <div className="search-result">
                            {dropdownOptions.length !== 0
                                ? dropdownOptions.map((value) => {
                                      return (
                                          <FriendCard
                                              key={value.country_id}
                                              userName="kalio"
                                              fullName="Duong Chi Kien"
                                          />
                                          //   <div key={value.country_id}>
                                          //       {value.country_id}
                                          //   </div>
                                      )
                                  })
                                : "No data"}
                        </div>
                    ) : null} */}
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
                            <img
                                src={
                                    currUser.avatar
                                        ? `${process.env.RESOURCE_URL}${currUser.avatar}`
                                        : Avatar
                                }
                                alt=""
                            />
                        </div>
                    </Dropdown>
                </div>
            </section>

            <Outlet />
        </>
    )
}

export default Header

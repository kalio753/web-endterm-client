import React, { createRef, useEffect, useState } from "react"
import Cover from "../../assets/images/cover.jpg"
import Avatar from "../../assets/images/avatar.jpg"
import { DatePicker, Input, message, Modal, Select } from "antd"
import dayjs from "dayjs"

import "./profile.scss"
import { useDispatch, useSelector } from "react-redux"
import {
    getProfileByIdSelector,
    getProfileMeSelector,
} from "../../redux/selector"
import { useParams } from "react-router-dom"
import { AxiosExpress } from "../../../utils/axios"
import { getProfileById } from "../../redux/slices/profileSlice"
import PostCard from "../../Components/PostCard/PostCard.jsx"
import Upload_ic from "../../assets/icon/file-upload.svg"
import { checkRecentDate, dateToShow } from "../../../utils/helper"

const Profile = () => {
    document.title = "@" + currUser.username
    const authUser = useSelector(getProfileMeSelector)
    const currUser = useSelector(getProfileByIdSelector)
    let { id } = useParams()
    const token = localStorage.getItem("token")
    const dispatch = useDispatch()
    const RESOURCE_URL =
        "http://ec2-18-181-190-3.ap-northeast-1.compute.amazonaws.com/"

    const [fullName, setFullName] = useState(undefined)
    const [phone, setPhone] = useState(undefined)
    const [dob, setDob] = useState(undefined)
    const [dobToShow, setDobToShow] = useState(undefined)
    const [gender, setGender] = useState(undefined)
    const [location, setLocation] = useState(undefined)
    const [bio, setBio] = useState(undefined)

    const fileInput = createRef()

    const [post, setPost] = useState([])

    const [isModalOpen, setIsModalOpen] = useState(false)

    useEffect(() => {
        AxiosExpress.post(`/api/post/get-by-id`, { token, id }).then(
            ({ data }) => setPost(data.data)
        )
        dispatch(getProfileById({ token, id }))
    }, [])

    const handleCoverChange = (e) => {
        const fileFormData = new FormData()
        fileFormData.append("file", e.target.files[0])
        AxiosExpress.post(`/upload?type=covers`, fileFormData, {
            headers: { "content-type": "multipart/form-data" },
        }).then((res) => {
            if (res.data.code === "Only images & documents are allowed") {
                message.warn("File can only be Images !")
            } else if (typeof res.data !== "string") {
                message.error("File upload failed, please try again later")
            } else {
                // console.log(res.data) This is the path
                AxiosExpress.post("/api/profile/update-cover", {
                    body: { avatar_2nd: res.data },
                    id,
                    token,
                }).then((res) => dispatch(getProfileById({ token, id })))
            }
        })
    }

    const handleAvtChange = (e) => {
        const fileFormData = new FormData()
        fileFormData.append("file", e.target.files[0])
        AxiosExpress.post(`/upload?type=avatars`, fileFormData, {
            headers: { "content-type": "multipart/form-data" },
        }).then((res) => {
            if (res.data.code === "Only images & documents are allowed") {
                message.warn("File can only be Images !")
            } else if (typeof res.data !== "string") {
                message.error("File upload failed, please try again later")
            } else {
                // console.log(res.data) This is the path
                AxiosExpress.post("/api/profile/update-ava", {
                    body: { avatar: res.data },
                    id,
                    token,
                }).then((res) => dispatch(getProfileById({ token, id })))
            }
        })
    }

    const showModal = () => {
        setIsModalOpen(true)
    }
    const handleOk = () => {
        setIsModalOpen(false)
    }
    const handleCancel = () => {
        setIsModalOpen(false)
    }

    const handleSumbitUpdate = () => {
        AxiosExpress.post(`/api/profile/update`, {
            token,
            id,
            body: { full_name: fullName, phone, dob, gender, location, bio },
        }).then(({ data }) => {
            if (data.code === 200) {
                message.success("Update successfully")
                dispatch(getProfileById({ token, id }))
                handleCancel()
            } else {
                message.danger("Something went wrong, please try again later")
            }
        })
    }

    return (
        <section className="page-body profile">
            <div className="profile-container">
                <div className="profile-cover">
                    <img
                        src={
                            currUser.avatar_2nd
                                ? `${RESOURCE_URL}${currUser.avatar_2nd}`
                                : Cover
                        }
                        alt=""
                    />
                    {authUser.id === currUser.id ? (
                        <form action="#">
                            <label className="profile-cover-edit">
                                Edit cover photo
                                <input
                                    type="file"
                                    ref={fileInput}
                                    multiple="multiple"
                                    onChange={handleCoverChange}
                                />
                            </label>
                        </form>
                    ) : null}
                </div>

                <div className="profile-body">
                    <div className="profile-body-avatar">
                        <img
                            src={
                                currUser.avatar
                                    ? `${RESOURCE_URL}${currUser.avatar}`
                                    : Avatar
                            }
                            alt=""
                        />
                        {authUser.id === currUser.id ? (
                            <form action="#">
                                <label className="avatar-edit">
                                    Edit avatar
                                    <input
                                        type="file"
                                        ref={fileInput}
                                        multiple="multiple"
                                        onChange={handleAvtChange}
                                    />
                                </label>
                            </form>
                        ) : null}
                    </div>

                    <div className="profile-body-right">
                        <div className="profile-body-name">
                            <h1>{currUser?.full_name}</h1>
                            {!currUser?.bio ? (
                                <div className="profile-body-name-desc">
                                    Haven't had a bio yet
                                </div>
                            ) : (
                                <div className="profile-body-name-desc">
                                    {currUser?.bio}
                                </div>
                            )}
                            <span
                                className="profile-body-name-edit"
                                onClick={showModal}
                            >
                                Edit profile
                            </span>
                        </div>
                        <ul className="profile-info-list">
                            <li className="profile-info-item">
                                <span>Gender: </span>{" "}
                                <span>{`${
                                    currUser?.gender
                                        ? currUser?.gender
                                        : "undefined"
                                }`}</span>
                            </li>
                            <li className="profile-info-item">
                                <span>Date of birth: </span>{" "}
                                <span>{`${
                                    currUser?.dob
                                        ? dateToShow(currUser.dob)
                                        : "undefined"
                                }`}</span>
                            </li>
                            <li className="profile-info-item">
                                <span>Phone: </span>{" "}
                                <span>{`${
                                    currUser?.phone
                                        ? currUser?.phone
                                        : "undefined"
                                }`}</span>
                            </li>
                            <li className="profile-info-item">
                                <span>Location: </span>{" "}
                                <span>{`${
                                    currUser?.location
                                        ? currUser?.location
                                        : "undefined"
                                }`}</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="profile-post">
                    {post.map((item) => (
                        <PostCard
                            avatar={item.user.avatar}
                            itemKey={item.id}
                            postContent={item.content}
                            picUrl={item.picture}
                            fullName={item.user.full_name}
                            postedAt={checkRecentDate(item.created_at)}
                        />
                    ))}
                </div>
            </div>

            <Modal
                title="Edit profile"
                wrapClassName="profile-edit-modal"
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                centered={true}
                footer={null}
            >
                <div className="input-section">
                    Full Name:{" "}
                    <Input
                        defaultValue={currUser.full_name}
                        value={fullName}
                        onChange={(e) => {
                            setFullName(e.target.value)
                        }}
                    />
                </div>
                <div className="input-section">
                    Phone:{" "}
                    <Input
                        defaultValue={currUser.phone}
                        placeholder=""
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                    />
                </div>
                <div className="input-section input-select">
                    Date of birth:{"  "}
                    <DatePicker
                        style={{
                            width: 200,
                        }}
                        onChange={(date, dateString) => {
                            setDobToShow(date)
                            setDob(dateString)
                        }}
                        value={dobToShow}
                        defaultValue={dayjs(currUser.dob, "YYYY-MM-DD")}
                    />
                </div>
                <div
                    className="input-section input-select"
                    style={{ marginBottom: 0 }}
                >
                    Gender:{" "}
                    <Select
                        style={{
                            width: 200,
                        }}
                        value={gender}
                        onChange={(value) => setGender(value)}
                        defaultValue={currUser.gender}
                        options={[
                            {
                                value: "Male",
                                label: "Male",
                            },
                            {
                                value: "Female",
                                label: "Female",
                            },
                            {
                                value: "Other",
                                label: "Other",
                            },
                        ]}
                    />
                </div>
                <div className="input-section">
                    Location:{" "}
                    <Input
                        placeholder=""
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        defaultValue={currUser.location}
                    />
                </div>
                <div className="input-section">
                    Bio:{" "}
                    <Input
                        placeholder=""
                        value={bio}
                        onChange={(e) => setBio(e.target.value)}
                        defaultValue={currUser.bio}
                    />
                </div>
                <button
                    className="input-confirm-btn"
                    onClick={handleSumbitUpdate}
                >
                    Confirm
                </button>
            </Modal>
        </section>
    )
}

export default Profile

import React, { useEffect, useState } from "react"
import Cover from "../../assets/images/cover.jpg"
import Avatar from "../../assets/images/avatar.jpg"
import { DatePicker, Input, message, Modal, Select } from "antd"
import dayjs from "dayjs"

import "./profile.scss"
import { useDispatch, useSelector } from "react-redux"
import { getProfileByIdSelector } from "../../redux/selector"
import { useParams } from "react-router-dom"
import { AxiosExpress } from "../../../utils/axios"
import { getProfileById } from "../../redux/slices/profileSlice"
import PostCard from "../../Components/PostCard/PostCard.jsx"

const Profile = () => {
    const currUser = useSelector(getProfileByIdSelector)
    let { id } = useParams()
    const token = localStorage.getItem("token")
    const dispatch = useDispatch()

    const [fullName, setFullName] = useState(undefined)
    const [phone, setPhone] = useState(undefined)
    const [dob, setDob] = useState(undefined)
    const [dobToShow, setDobToShow] = useState(undefined)
    const [gender, setGender] = useState(undefined)
    const [location, setLocation] = useState(undefined)
    const [bio, setBio] = useState(undefined)

    const [isModalOpen, setIsModalOpen] = useState(false)

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
                    <img src={Cover} alt="" />
                    <div className="profile-cover-edit">Edit cover photo</div>
                </div>

                <div className="profile-body">
                    <div className="profile-body-avatar">
                        <img src={Avatar} alt="" />
                        <div className="avatar-edit">Edit avatar</div>
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
                                    currUser?.dob ? currUser?.dob : "undefined"
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
                    <PostCard fullName={"Kalio"} postedAt={"8h"} />
                    <PostCard fullName={"Kalio"} postedAt={"8h"} />
                    <PostCard fullName={"Kalio"} postedAt={"8h"} />
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

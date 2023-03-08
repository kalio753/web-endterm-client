import React, { useState } from "react"
import Cover from "../../assets/images/cover.jpg"
import Avatar from "../../assets/images/avatar.jpg"
import { DatePicker, Input, Modal, Select } from "antd"

import "./profile.scss"

const Profile = () => {
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
                            <h1>Dương Chí Kiện</h1>
                            <div className="profile-body-name-desc">
                                Haven't had a bio yet
                            </div>
                            <span
                                className="profile-body-name-edit"
                                onClick={showModal}
                            >
                                Edit profile
                            </span>
                        </div>
                        <ul className="profile-info-list">
                            <li className="profile-info-item">
                                <span>Gender: </span> <span>Male</span>
                            </li>
                            <li className="profile-info-item">
                                <span>Date of birth: </span>{" "}
                                <span>03/07/2001</span>
                            </li>
                            <li className="profile-info-item">
                                <span>Phone: </span> <span>0993426320</span>
                            </li>
                            <li className="profile-info-item">
                                <span>Location: </span>{" "}
                                <span>Ho Chi Minh city</span>
                            </li>
                        </ul>
                    </div>
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
                    Full Name: <Input placeholder="" />
                </div>
                <div className="input-section">
                    Phone: <Input placeholder="" />
                </div>
                <div className="input-section input-select">
                    Date of birth:{"  "}
                    <DatePicker
                        style={{
                            width: 200,
                        }}
                        onChange={(date, dateString) =>
                            console.log(date, dateString)
                        }
                    />
                </div>
                <div className="input-section input-select">
                    Gender:{" "}
                    <Select
                        defaultValue="male"
                        style={{
                            width: 200,
                        }}
                        onChange={(value) => console.log(`selected ${value}`)}
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
                    Location: <Input placeholder="" />
                </div>
                <button className="input-confirm-btn">Confirm</button>
            </Modal>
        </section>
    )
}

export default Profile

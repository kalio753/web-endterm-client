import React, { useState } from "react"
import "./profile.scss"
import SideBar from "../../Components/SideBar/SideBar.jsx"
import Avatar from "../../assets/images/avatar.jpg"
import { Modal } from "antd"

const Profile = () => {
    document.title = "Profile"

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
        <>
            <section className="page-body profile">
                <SideBar />
                <div className="profile-col-central">
                    <div className="feeds">
                        <div className="upload-section">
                            <div className="upload">
                                <img src={Avatar} alt="" />
                                <div
                                    className="upload-input"
                                    onClick={showModal}
                                >
                                    What's on your mind, Kalio ...
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="profile-col-side col-2">c</div>
            </section>

            <Modal
                title="Basic Modal"
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                centered={true}
            >
                <p>Some contents...</p>
                <p>Some contents...</p>
                <p>Some contents...</p>
            </Modal>
        </>
    )
}

export default Profile

import React, { useState } from "react"
import "./feed.scss"
import SideBar from "../../Components/SideBar/SideBar.jsx"
import Avatar from "../../assets/images/avatar.jpg"
import { Input, Modal } from "antd"
const { TextArea } = Input

const Feed = ({ theme }) => {
    document.title = "Not Facebook"

    const [postContentValue, setPostContentValue] = useState("")
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
            <section className="page-body feed">
                <SideBar />
                <div className="feed-col-central">
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
                <div className="feed-col-side col-2">c</div>
            </section>

            <Modal
                title="Create post"
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                centered={true}
                wrapClassName={`feed-modal ${
                    theme === "dark" ? "feed-modal-dark" : "feed-modal-light"
                }`}
            >
                <TextArea
                    value={postContentValue}
                    onChange={(e) => setPostContentValue(e.target.value)}
                    placeholder="What's on your mind, Kalio ..."
                    autoSize={{
                        minRows: 3,
                        maxRows: 7,
                    }}
                />
            </Modal>
        </>
    )
}

export default Feed

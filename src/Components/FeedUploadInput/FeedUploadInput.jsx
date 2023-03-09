import React, { createRef, useState } from "react"
import "./feedUploadInput.scss"
import Upload_ic from "../../assets/icon/file-upload.svg"
import Avatar from "../../assets/images/avatar.jpg"
import { Input, message, Modal } from "antd"
import { AxiosExpress } from "../../../utils/axios"
const { TextArea } = Input

const FeedUploadInput = ({ theme, user }) => {
    const token = localStorage.getItem("token")
    const [postContentValue, setPostContentValue] = useState("")
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [currFile, setCurrFile] = useState(null)
    const fileInput = createRef()

    const handleFileChange = (e) => {
        setCurrFile(e.target.files[0])
    }

    const handleRemoveFile = () => {
        setCurrFile(null)
    }

    const showModal = () => {
        setIsModalOpen(true)
    }

    const handleCancel = () => {
        setIsModalOpen(false)
    }

    const handleUploadPost = () => {
        const fileFormData = new FormData()
        fileFormData.append("file", currFile)
        AxiosExpress.post(`/upload`, fileFormData, {
            headers: { "content-type": "multipart/form-data" },
        }).then((res) => {
            if (res.data.code === "Only images & documents are allowed") {
                message.warn("File can only be Images !")
            } else if (typeof res.data !== "string") {
                message.error("File upload failed, please try again later")
            } else {
                // console.log(res.data)
                AxiosExpress.post(`/api/post/upload`, {
                    token,
                    body: {
                        content: postContentValue,
                        picture: res.data,
                        user_id: user.id,
                    },
                }).then((res) => console.log(res))
            }
        })
    }

    return (
        <>
            <div className="upload-section">
                <div className="upload">
                    <img src={Avatar} alt="" />
                    <div className="upload-input" onClick={showModal}>
                        What's on your mind, {user?.full_name} ...
                    </div>
                </div>
            </div>

            <Modal
                title="Create post"
                open={isModalOpen}
                footer={null}
                onCancel={handleCancel}
                centered={true}
                wrapClassName={`feed-modal ${
                    theme === "dark" ? "feed-modal-dark" : "feed-modal-light"
                }`}
            >
                <TextArea
                    value={postContentValue}
                    onChange={(e) => setPostContentValue(e.target.value)}
                    placeholder={`What's on your mind, ${user?.full_name} ...`}
                    autoSize={{
                        minRows: 3,
                        maxRows: 7,
                    }}
                />

                <form action="#">
                    <label className="file-btn">
                        <img src={Upload_ic} alt="" />
                        Chose an image to upload
                        <input
                            type="file"
                            ref={fileInput}
                            multiple="multiple"
                            onChange={handleFileChange}
                        />
                    </label>
                </form>

                {currFile ? (
                    <div className="file-preview">
                        <img src={URL.createObjectURL(currFile)} alt="" />
                        <div onClick={handleRemoveFile}>X</div>
                    </div>
                ) : null}

                <button className="post-btn" onClick={handleUploadPost}>
                    Post
                </button>
            </Modal>
        </>
    )
}

export default FeedUploadInput

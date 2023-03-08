import React, { createRef, useState } from "react"
import "./feedUploadInput.scss"
import Upload_ic from "../../assets/icon/file-upload.svg"
import Avatar from "../../assets/images/avatar.jpg"
import { Input, Modal } from "antd"
const { TextArea } = Input

const FeedUploadInput = ({ theme, user }) => {
    const [postContentValue, setPostContentValue] = useState("")
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [currFile, setCurrFile] = useState(null)
    const fileInput = createRef()

    const handleFileChange = (e) => {
        console.log("file ne: ", e.target.files[0])
        setCurrFile(e.target.files[0])
        // dispatch(setJsonData(jsonData))
        // handleFileOnChange(setFileList, fileInput, setFileQuantities)
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

                <button className="post-btn">Post</button>
            </Modal>
        </>
    )
}

export default FeedUploadInput

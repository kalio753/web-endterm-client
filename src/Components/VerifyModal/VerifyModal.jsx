import { Modal } from "antd"
import React, { useEffect, useState } from "react"
import { AxiosExpress } from "../../../utils/axios"
import "./verifyModal.scss"

const VerifyModal = ({ isOpen, setIsOpen, user }) => {
    const [countdown, setCountdown] = useState(null)
    const [isCounting, setIsCounting] = useState(false)

    useEffect(() => {
        let timer

        if (isCounting && countdown > 0) {
            timer = setInterval(() => {
                setCountdown((prevCountdown) => {
                    if (prevCountdown === 1) {
                        return null
                    } else return prevCountdown - 1
                })
            }, 1000)
        } else {
            clearInterval(timer)
        }

        return () => clearInterval(timer)
    }, [countdown, isCounting])

    const handleStartCountdown = () => {
        setCountdown(60)
        setIsCounting(true)
        AxiosExpress.post(`/api/user/resend-verification`, {
            user: user,
        }).then(({ data }) => console.log(data))
    }

    const handleOk = () => {
        setIsOpen(false)
    }
    const handleCancel = () => {
        setIsOpen(false)
    }

    return (
        <Modal
            title="Please verify"
            wrapClassName="verify-modal"
            open={isOpen}
            onOk={handleOk}
            onCancel={handleCancel}
            centered={true}
            footer={null}
        >
            <p>
                An verification email has been sent to you, please have a check!
            </p>

            {countdown ? (
                <h1>{countdown}</h1>
            ) : (
                <p>
                    Didn't see the mail?{" "}
                    <span className="count-btn" onClick={handleStartCountdown}>
                        Click here
                    </span>{" "}
                    to receive another verification email!
                </p>
            )}
        </Modal>
    )
}

export default VerifyModal

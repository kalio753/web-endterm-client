import React, { useState } from "react"
import "./postCard.scss"
import Avatar from "../../assets/images/avatar.jpg"
import Post from "../../assets/images/post.jpg"
import Like from "../../assets/icon/like.svg"
import Dislike from "../../assets/icon/dislike.svg"
import { Dropdown, message } from "antd"
import { AxiosExpress } from "../../../utils/axios"
import { useDispatch } from "react-redux"
import { getAllPosts } from "../../redux/slices/postSlice"

export default function PostCard({
    isOwner,
    avatar,
    fullName,
    postedAt,
    postContent,
    itemKey,
    picUrl,
    postId,
}) {
    const RESOURCE_URL =
        "http://ec2-18-181-190-3.ap-northeast-1.compute.amazonaws.com"
    const token = localStorage.getItem("token")
    const dispatch = useDispatch()

    const items = [
        {
            label: (
                <div style={{ color: "red " }} onClick={handleDeletePost}>
                    Delete
                </div>
            ),
            key: "0",
        },
        {
            label: <a href="#">Edit</a>,
            key: "1",
        },
    ]

    function handleDeletePost() {
        AxiosExpress.post(`/api/post/delete`, { token, id: itemKey }).then(
            ({ data }) => {
                if (data.code === 200) {
                    dispatch(getAllPosts({ token }))
                    message.success("Delete post successfully!")
                }
            }
        )
    }

    return (
        <div className="post" key={itemKey}>
            <div className="post-header">
                <img
                    src={avatar ? `${RESOURCE_URL}${avatar}` : Avatar}
                    alt=""
                />
                <div className="header-info">
                    <div className="name">{fullName}</div>
                    <div className="posted-at">{postedAt}</div>
                </div>
                {isOwner ? (
                    <div className="header-more">
                        <Dropdown
                            placement="bottomRight"
                            menu={{
                                items,
                            }}
                            trigger={["click"]}
                        >
                            <a onClick={(e) => e.preventDefault()}>...</a>
                        </Dropdown>
                    </div>
                ) : null}
            </div>

            <div className="post-caption">{postContent}</div>

            <div className="post-body">
                <img src={`${RESOURCE_URL}${picUrl}`} alt="" />
                {/* <img src={Post} alt="" /> */}
            </div>

            <div className="post-reaction">
                <div className="like">
                    12
                    <img src={Like} alt="" />
                </div>
                <div className="dislike">
                    2<img src={Dislike} alt="" />
                </div>
            </div>

            <div className="post-footer">
                <button className="react-btn like-active">
                    <img src={Like} alt="" />
                    Like
                </button>
                <button className="react-btn dislike-active">
                    <img src={Dislike} alt="" />
                    Dislike
                </button>
            </div>
        </div>
    )
}

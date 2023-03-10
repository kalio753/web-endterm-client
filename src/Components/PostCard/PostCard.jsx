import React, { useState } from "react"
import "./postCard.scss"
import Avatar from "../../assets/images/avatar.jpg"
import Post from "../../assets/images/post.jpg"
import Like from "../../assets/icon/like.svg"
import Dislike from "../../assets/icon/dislike.svg"
import { Dropdown } from "antd"

export default function PostCard({
    fullName,
    postedAt,
    postContent,
    key,
    picUrl,
}) {
    const RESOURCE_URL = "http://127.0.0.1:5000"
    const items = [
        {
            label: <div onClick={handleDeletePost}>Delete</div>,
            key: "0",
        },
        {
            label: <a href="#">Edit</a>,
            key: "1",
        },
    ]

    function handleDeletePost() {}

    return (
        <div className="post" key={key}>
            <div className="post-header">
                <img src={Avatar} alt="" />
                <div className="header-info">
                    <div className="name">{fullName}</div>
                    <div className="posted-at">{postedAt}</div>
                </div>
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
            </div>

            <div className="post-caption">{postContent}</div>

            <div className="post-body">
                {/* <img src={`${RESOURCE_URL}${picUrl}`} alt="" /> */}
                <img src={Post} alt="" />
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

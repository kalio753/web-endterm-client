import React, { useEffect, useState } from "react"
import "./feed.scss"
import SideBar from "../../Components/SideBar/SideBar.jsx"
import FeedUploadInput from "../../Components/FeedUploadInput/FeedUploadInput.jsx"
import Avatar from "../../assets/images/avatar.jpg"
import Post from "../../assets/images/post.jpg"
import Like from "../../assets/icon/like.svg"
import Dislike from "../../assets/icon/dislike.svg"
import { AxiosExpress } from "../../../utils/axios"
import { useDispatch, useSelector } from "react-redux"
import {
    getAllPostsSelector,
    getProfileByIdSelector,
    getProfileMeSelector,
} from "../../redux/selector"
import { getProfileById, getProfileMe } from "../../redux/slices/profileSlice"
import { getAllPosts } from "../../redux/slices/postSlice"
import { checkRecentDate } from "../../../utils/helper"
import PostCard from "../../Components/PostCard/PostCard.jsx"
import { useNavigate } from "react-router-dom"

const Feed = ({ theme }) => {
    document.title = "Not Facebook"
    const token = localStorage.getItem("token")
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const currUser = useSelector(getProfileMeSelector)
    const allPost = useSelector(getAllPostsSelector)
    const [friendSuggest, setFriendSuggest] = useState([])

    useEffect(() => {
        dispatch(getProfileMe({ token }))
        dispatch(getAllPosts({ token }))
        AxiosExpress.post("/api/user/suggest-friend", { token }).then(
            ({ data }) => setFriendSuggest(data.data)
        )
    }, [dispatch])

    const handleFriendCardClick = (id) => {
        navigate("/profile/" + id)
    }

    return (
        <>
            <section className="page-body feed">
                <SideBar user={currUser} />
                <div className="feed-col-central">
                    <div className="feeds">
                        <FeedUploadInput theme={theme} user={currUser} />

                        <div className="post-section">
                            {allPost.map((post) => (
                                <PostCard
                                    isOwner={currUser.id === post.user.id}
                                    avatar={post.user.avatar}
                                    itemKey={post.id}
                                    postContent={post.content}
                                    picUrl={post.picture}
                                    fullName={post.user.full_name}
                                    postedAt={checkRecentDate(post.created_at)}
                                />
                            ))}
                        </div>
                    </div>
                </div>
                <div className="feed-col-side col-2">
                    <h1>Friend suggestion</h1>
                    {friendSuggest.map((user) => (
                        <div
                            className="friend-card"
                            onClick={() => handleFriendCardClick(user.id)}
                        >
                            <img
                                src={
                                    user.avatar
                                        ? `${process.env.RESOURCE_URL}${user.avatar}`
                                        : Avatar
                                }
                                alt=""
                                className="friend-card-avatar"
                            />

                            <div className="friend-card-info">
                                <div className="friend-card-fullname">
                                    {user.full_name}
                                </div>

                                <div className="friend-card-username">
                                    @{user.username}
                                </div>
                            </div>
                        </div>
                    ))}

                    <div className="friend-card">
                        <img
                            src={Avatar}
                            alt=""
                            className="friend-card-avatar"
                        />

                        <div className="friend-card-info">
                            <div className="friend-card-fullname">
                                Duong Chi Kien
                            </div>

                            <div className="friend-card-username">@kalio</div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Feed

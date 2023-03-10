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

const Feed = ({ theme }) => {
    const RESOURCE_URL = "http://127.0.0.1:5000"
    document.title = "Not Facebook"
    const token = localStorage.getItem("token")
    const dispatch = useDispatch()
    const currUser = useSelector(getProfileMeSelector)
    const allPost = useSelector(getAllPostsSelector)
    const [friendSuggest, setFriendSuggest] = useState([])
    console.log("friendSuggest", friendSuggest)

    useEffect(() => {
        // dispatch(getProfileMe({ token }))
        // dispatch(getAllPosts({ token }))
        // AxiosExpress.post("/api/user/suggest-friend", { token }).then(
        //     ({ data }) => setFriendSuggest(data.data)
        // )
    }, [dispatch])

    return (
        <>
            <section className="page-body feed">
                <SideBar user={currUser} />
                <div className="feed-col-central">
                    <div className="feeds">
                        <FeedUploadInput theme={theme} user={currUser} />

                        <div className="post-section">
                            {allPost.map((post) => (
                                <div className="post" key={post.id}>
                                    <div className="post-header">
                                        <img src={Avatar} alt="" />
                                        <div className="header-info">
                                            <div className="name">
                                                {post.user.full_name}
                                            </div>
                                            <div className="posted-at">
                                                {checkRecentDate(
                                                    post.created_at
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="post-caption">
                                        {post.content}
                                    </div>
                                    <div className="post-body">
                                        <img
                                            src={`${RESOURCE_URL}${post.picture}`}
                                            alt=""
                                        />
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
                                        <button className="react-btn">
                                            <img src={Like} alt="" />
                                            Like
                                        </button>
                                        <button className="react-btn">
                                            <img src={Dislike} alt="" />
                                            Dislike
                                        </button>
                                    </div>
                                </div>
                            ))}

                            <PostCard fullName={"Kalio"} postedAt={"8h"} />
                        </div>
                    </div>
                </div>
                <div className="feed-col-side col-2">
                    <h1>Friend suggestion</h1>
                    {friendSuggest.map((user) => (
                        <div className="friend-card">
                            <img
                                src={Avatar}
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

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
import { getProfileByIdSelector } from "../../redux/selector"
import { getProfileById } from "../../redux/slices/profileSlice"

const Feed = ({ theme }) => {
    document.title = "Not Facebook"
    const token = localStorage.getItem("token")
    const dispatch = useDispatch()
    const initUser = useSelector(getProfileByIdSelector)
    // const [initUser, setInitUser] = useState(null)
    // console.log("alo", initUser)

    useEffect(() => {
        // AxiosExpress.post(`/api/profile/get-me`, { token }).then((res) =>
        //     setInitUser(res.data.data)
        // )
        dispatch(getProfileById({ token, id: 1 }))
    }, [dispatch])

    return (
        <>
            <section className="page-body feed">
                <SideBar user={initUser} />
                <div className="feed-col-central">
                    <div className="feeds">
                        <FeedUploadInput theme={theme} user={initUser} />

                        <div className="post-section">
                            {/* <div className="post">
                                <div className="post-header">
                                    <img src={Avatar} alt="" />
                                    <div className="header-info">
                                        <div className="name">
                                            Duong Chi Kien
                                        </div>
                                        <div className="posted-at">12h</div>
                                    </div>
                                </div>

                                <div className="post-body">
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
                            <div className="post">
                                <div className="post-header">
                                    <img src={Avatar} alt="" />
                                    <div className="header-info">
                                        <div className="name">
                                            Dương Chí Kiện
                                        </div>
                                        <div className="posted-at">12h</div>
                                    </div>
                                </div>

                                <div className="post-body">
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
                            </div> */}
                        </div>
                    </div>
                </div>
                <div className="feed-col-side col-2">c</div>
            </section>
        </>
    )
}

export default Feed

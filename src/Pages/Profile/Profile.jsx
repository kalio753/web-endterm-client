import React from "react"
import Avatar from "../../assets/images/avatar.jpg"
import "./profile.scss"

const Profile = () => {
    document.title = "Profile"
    return (
        <section className="page-body profile">
            <div className="profile-col-side col-1">
                <div className="menu">
                    <div className="menu-item">
                        <img src={Avatar} alt="" />
                        <h3>Dương Chí Kiện</h3>
                    </div>
                    <div className="menu-item">
                        <img src={Avatar} alt="" />
                        <h3>Friends</h3>
                    </div>
                    <div className="menu-item">
                        <img src={Avatar} alt="" />
                        <h3>Groups</h3>
                    </div>
                    <div className="menu-item">
                        <img src={Avatar} alt="" />
                        <h3>Memories</h3>
                    </div>
                </div>
            </div>
            <div className="profile-col-central">b</div>
            <div className="profile-col-side">c</div>
        </section>
    )
}

export default Profile

import React from "react"
import "./friendCard.scss"
import Avatar from "../../assets/images/avatar.jpg"

export default function FriendCard({ fullName, userName, avaUrl, key }) {
    return (
        <div className="friend-card" key={key}>
            <img src={Avatar} alt="" className="friend-card-avatar" />

            <div className="friend-card-info">
                <div className="friend-card-fullname">{fullName}</div>

                <div className="friend-card-username">@{userName}</div>
            </div>
        </div>
    )
}

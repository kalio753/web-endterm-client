import React from "react"
import "./sidebar.scss"
import Avatar from "../../assets/images/avatar.jpg"
import Ad from "../../assets/images/ad.gif"
import Group from "../../assets/icon/group.svg"
import Friend from "../../assets/icon/friend.svg"
import Memo from "../../assets/icon/memo.svg"
import Saved from "../../assets/icon/saved.svg"
import Event from "../../assets/icon/event.svg"
import MenuCard from "../../Components/MenuCard/MenuCard.jsx"
import GlobalSvgIcon from "../../Components/GlobalSvgIcon/GlobalSvgIcon.jsx"
import More from "../../assets/icon/more.svg"

const SideBar = () => {
    return (
        <div className="feed-col-side col-1">
            <div className="menu">
                <MenuCard
                    imgUrl={Avatar}
                    title="Dương Chí Kiện"
                    isAvatar={true}
                />
                <MenuCard imgUrl={Friend} title="Friends" />
                <MenuCard imgUrl={Group} title="Groups" />
                <MenuCard imgUrl={Memo} title="Memories" />
                <MenuCard imgUrl={Saved} title="Saved" />
                <MenuCard imgUrl={Event} title="Events" />
                <MenuCard imgUrl={Event} title="See more">
                    <GlobalSvgIcon url={More} />
                </MenuCard>
            </div>

            <img className="ad" src={Ad} alt="" />
        </div>
    )
}

export default SideBar

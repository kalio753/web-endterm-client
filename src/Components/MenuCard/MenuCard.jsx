import React from "react"
import "./menuCard.scss"

const MenuCard = ({ imgUrl, title, isAvatar, children }) => {
    console.log(title, children)
    return (
        <div className="menu-card">
            {!children ? (
                <img
                    src={imgUrl}
                    alt=""
                    className={`${
                        isAvatar ? "menu-card-avatar" : "menu-card-icon"
                    }`}
                />
            ) : (
                children
            )}
            <h3>{title}</h3>
        </div>
    )
}

export default MenuCard

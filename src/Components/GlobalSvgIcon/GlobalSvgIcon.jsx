import React from "react"
import "./globalSvgIcon.scss"

const GlobalSvgIcon = ({ url }) => {
    return (
        <div className="global-svg-icon">
            <img src={url} alt="" />
        </div>
    )
}

export default GlobalSvgIcon

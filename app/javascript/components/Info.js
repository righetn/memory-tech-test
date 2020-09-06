import React from "react"
import "./Info.scss"

const Info = ({title, value}) => {
    return (
        <div className="info-container">
            <p>{title}</p>
            <p>{value}</p>
        </div>
    )
}

export default Info
import React from "react"
import "./Info.scss"

const Info = ({title, value}) => {
    return (
        <div className="info-container">
            <h3 className="title">{title}</h3>
            <p className='value'>{value}</p>
        </div>
    )
}

export default Info
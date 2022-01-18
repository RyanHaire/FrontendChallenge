import React from 'react'
import "../styles/card.css"

const Card = ({imgUrl, date, title, description, liked , handleClick}) => {
    return (
        <div className="card">
            <img className="card-img" src={imgUrl} />
            <div className="display-flex-center">
                <div>
                    <p className="mt-10">{title}</p>
                    <p>{description}</p>
                    <p>{date}</p>
                    
                </div>
                <button className="card-btn" onClick={handleClick}><i className={`card-btn-icon fas fa-heart fa-2x ${liked ? "liked" : "unliked"}`}/></button>
            </div>
           
        </div>
    )
}

export default Card
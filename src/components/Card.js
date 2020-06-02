import React from 'react'
import '../bootstrap.min.css'
import './Card.css'
 const Card = (props) => {
    return (
        <div className="card mx-auto my-3 bg-light grow" style={{width:"18rem"}}>
                <img src={props.img} className="card-img-top" alt="avatar"/>
                <div className="card-body">
                    <p className="card-text">
                      <span className="text-info d-block"><b>{props.name}</b></span>
                        <hr></hr>
                      <span className="text-info d-block"><b>{props.githubUrl}</b></span>
                    </p>
                </div>
        </div>
    )
}


export default Card;
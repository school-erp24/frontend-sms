const BgCard = (props) =>{
    return(
        <div className="media">
            <span className="me-3">
                {props.icon}
            </span>
            <div className="media-body text-white">
                <p className="mb-1 text-white">{props.title}</p>
                <h3 className="text-white">{props.number}</h3>
                <div className={`progress mb-2 bg-${props.color}`}>
                    <div className="progress-bar progress-animated bg-white" style={{width: props.percent}}></div>
                </div>
                <small>{props.percent} Increase in 20 Days</small>
            </div>
        </div>
    )
}

const ProgressCard = (props) =>{
    return(        
        <div className="card-body">
            <h4 className="card-title">{props.title}</h4>
            <h3 className="fw-bold">{props.number}</h3>
            <div className="progress mb-2">
                <div className={`progress-bar progress-animated bg-${props.color}`} style={{width: props.percent}}></div>
            </div>
            <small>{props.percent} Increase in 20 Days</small>
        </div>
        
    )
}


export {BgCard, ProgressCard};
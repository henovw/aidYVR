import "./MiniDesc.css"

function MiniDesc(props) {
    return (
        <div>
            
        <div className="box">
            <div className="minidesc-image-exit">
        <button className="exit" onClick={props.onClose}><img src="src/assets/xbutton.png"></img></button>
            <img className="minidesc-image" src={props.img}></img>
            </div>
            <h1>{props.title}</h1>
            <br></br>
            <div class="categories">
            
            {props.categories.map(item => (
                <p className="category">{item}</p>
            ))}
            {props.needs.map(item => (
                <p className="need">{item}</p>
            ))}
            </div>
                <br></br>
            
            <div className="links-minidesc">
            <br></br>
            <a href={props.applylink} target="_blank">
            <button className="apply-minidesc">Apply</button>
            </a>

                <br></br>
            <a href={props.donatelink} target="_blank">
            <button className="link">Donate 🥰</button>
            </a>
            </div>

            
        </div>
        </div>
    )
}

export default MiniDesc
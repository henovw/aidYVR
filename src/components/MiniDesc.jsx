import "./MiniDesc.css"

function MiniDesc(props) {
    return (
        <div>
            
        <div className="box">
        <button className="exit" onClick={props.onClose}><img src="src/assets/xbutton.png"></img></button>
            <img src={props.img}></img>
            <h1>{props.name}</h1>
            <p>{props.description}</p>
            <br></br>
            <div class="categories">
                
            {props.categories.map(item => (
                <p className="category" key={item}>{item}</p>
            ))}
            </div>
                <br></br>
            <h2>We need:</h2>
            <div className="categories">
            {props.needs.map(item => (
                <p className="need" key={item}>{item}</p>
            ))}
            </div>

                <br></br>
            <a href={props.link} target="_blank">
            <button className="link">Donate 🥰</button>
            </a>

            
        </div>
        </div>
    )
}

export default MiniDesc
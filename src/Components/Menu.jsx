import './Menu.css'
export default function Menu({start}) {
    return (
        <div className="menu">
            <h1 className="page--title">Quizzical</h1>
            <span className="page--description">Description</span>
            <button onClick={start} className='page--button'>Start Quizzical</button>
        </div>
    )
}
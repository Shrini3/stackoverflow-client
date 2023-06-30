import {Link} from "react-router-dom"
export default function Navbar() {
    return (
        <div className="navbar">
            <Link to="/" className="logo">Stack Overflow</Link>
            <Link>About</Link>
            <Link>For Teams</Link>
            <Link>Enterprise</Link>
            <img src="../../search.png" className="search-img" alt="search-icon"/>
            <form>
                <input type="text" placeholder="Search"></input>
            </form>
            <Link className="signup-btn"><button>Sign Up</button></Link>
        </div>
    )
}
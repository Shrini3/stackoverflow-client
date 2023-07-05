import {Link, Outlet} from "react-router-dom"
import Account from "../assets/AccountProfile"
export default function Navbar() {

    const user = null

    return (
        <div>
            <div className="navbar">
                <Link to="/" className="logo">Stack Overflow</Link>
                <Link to="/about">About</Link>
                <Link>For Teams</Link>
                <Link>Products</Link>
                <img src="../../search.png" className="search-img" alt="search-icon"/>
                <form>
                    <input type="text" placeholder="Search"></input>
                </form>
                {
                    user ? <>
                    <Account name={user}/> 
                    <Link className="logout-btn"><button>Log out</button></Link> </> : 
                    <Link to="/auth" className="signup-btn"><button>Sign Up</button></Link>
                }
            </div>
            <Outlet/>
        </div>
    )
}
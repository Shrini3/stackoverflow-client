import {Link, Outlet, useNavigate} from "react-router-dom"
import Account from "../assets/AccountProfile"
import { useState, useRef } from "react"
//import {useSelector, useDispatch} from "react-redux"
//import { logout } from "../features/userReducer"
//import { setCurrentUser } from "../actions/currentUser"
// import { toast, ToastContainer } from "react-toastify"
export default function Navbar() {

    //const dispatch = useDispatch()
    //const user = useSelector((state) => state.user.value)
    //const name = user.username
    const [searchquery, SetSearchQuery] = useState("")
    const name = localStorage.getItem("username")
    const searchInstructionDivRef = useRef(null)

    const navigate = useNavigate()
    function logout() {
        localStorage.clear()
        navigate("/authlogin")
    }

    function displaySearchInstruction() {
        //const ele = document.getElementsByClassName("search-info-div")
        searchInstructionDivRef.current.style.display = "block"
        console.log("searchbox")
        setTimeout(()=> {
            searchInstructionDivRef.current.style.display = "none"
        }, 10000)
    }

    function handleChange(e) {
        e.preventDefault()
        SetSearchQuery(e.target.value)
        console.log(searchquery)
    }

    function searchOnEnter(e) {
        if(e.key === 'Enter') {
            e.preventDefault()
            console.log(`/search?searchtag=${searchquery}`)
            navigate(`/search?searchtag=${searchquery}`)
        }
        //console.log(searchquery)
    }

    return (
        <div>
            <div className="navbar">
                {/* <button onClick={() => makenotification}>roae</button>
                <ToastContainer /> */}
                <Link to="/" className="logo">Stack Overflow</Link>
                <Link to="/about">About</Link>
                {/* <Link>For Teams</Link>
                <Link>Products</Link> */}
                <img src="../../search.png" className="search-img" alt="search-icon"/>
                <form >
                    <input 
                        type="text" 
                        placeholder="Search" 
                        value={searchquery} 
                        onChange={handleChange} 
                        onKeyDown={searchOnEnter}
                        onFocus={displaySearchInstruction}
                        ></input>
                </form>
                <div className="search-info-div" style={{display: "none"}} ref = {searchInstructionDivRef}>
                    <span><strong>[tag]</strong><span> : enter topic tag</span></span>
                    <br/>
                    <span><strong>":exact phrase here"</strong><span> : enter search phrase here</span></span>
                </div>
                {
                    //user.username 
                    name ? <>
                    <Link to= {`/profile/${name}`} id="account-link"><Account name={name}/></Link>
                    <Link className="logout-btn"><button onClick={() => logout()}>Log out</button></Link> </> : 
                    <Link to="/auth" className="signup-btn"><button>Sign Up</button></Link>
                }
            </div>
            <div className="mainsection">
                <Outlet/>
            </div>
        </div>
    )
}
import {Link, Outlet, useNavigate} from "react-router-dom"
import Account from "../assets/AccountProfile"
//import {useSelector, useDispatch} from "react-redux"
//import { logout } from "../features/userReducer"
//import { setCurrentUser } from "../actions/currentUser"
// import { toast, ToastContainer } from "react-toastify"
export default function Navbar() {

    //const dispatch = useDispatch()
    //const user = useSelector((state) => state.user.value)
    //const name = user.username
    const name = localStorage.getItem("username")
    //console.log(user.username)

    // React.useEffect(()=> {
    //     dispatch(setCurrentUser(JSON.parse(localStorage.getItem('Profile'))))
    // },[dispatch])
    const navigate = useNavigate()
    function logout() {
        localStorage.clear()
        navigate("/authlogin")
    }

    // const makenotification = () => {
    //     toast("make some roar")
    // }

    return (
        <div>
            <div className="navbar">
                {/* <button onClick={() => makenotification}>roae</button>
                <ToastContainer /> */}
                <Link to="/" className="logo">Stack Overflow</Link>
                <Link to="/about">About</Link>
                <Link>For Teams</Link>
                <Link>Products</Link>
                <img src="../../search.png" className="search-img" alt="search-icon"/>
                <form>
                    <input type="text" placeholder="Search"></input>
                </form>
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
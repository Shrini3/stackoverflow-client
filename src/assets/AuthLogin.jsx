import { useState } from "react"
//import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import axios from "axios"
//import { user } from "../features/userReducer"
//import { login } from "../main.js"
//import { login_action } from "../actions/authAction"

export default function AuthLogin() {

    const [loginDetails, setloginDetails] = useState({
        username: "",
        email: "",
        password: ""
    })

    //const dispatch = useDispatch()
    const navigate = useNavigate()

    function handleChange(event) {
        setloginDetails({
            ...loginDetails,
            [event.target.name]: event.target.value
        })
    }

    let loginStatus = false
    function handleSubmit(e) {
        e.preventDefault()
        console.log(loginDetails)
        //dispatch(login_action(loginDetails), navigate)
        //dispatch(user(loginDetails))
        login(loginDetails)
        console.log(loginStatus)
            // if(loginStatus) {
            //     localStorage.setItem("username", loginDetails.username)
            //     //getCookie(loginDetails)
            //     navigate('/')
            // } 
    }

    function login(logindata) {
        axios.post("http://localhost:5001/login", logindata)
        .then(res => {
            console.log(res.data)
            localStorage.setItem("Token", res.data.token)
            localStorage.setItem("Refresh Token", res.data.refreshToken)
            localStorage.setItem("username", loginDetails.username)
            localStorage.setItem("reputation", res.data.r)
            navigate('/')
            loginStatus = true 
        }).catch(err => {
            //console.log(err)
            if(err.response.status === 500) {
                console.log('Error:', err.response.data.message)
                alert(err.response.data.message)
            }
            if(err.response.status === 401) {
                console.log('Error:', err.response.data.message)
                alert(err.response.data.message)
            }
            loginStatus = false
        })
    }

    return (
        <form className="login-form" onSubmit={handleSubmit}>  
            
            <label htmlFor="username">Username</label>
            <input 
             type="text" 
             id="username"
             name="username"
             value = {loginDetails.username}
             onChange={handleChange}
             required
             ></input>
            
            <label htmlFor="password">Enter password</label>
            <input 
             type="password" 
             id="password"
             name="password"
             value = {loginDetails.password}
             onChange={handleChange}
             required
             ></input>

            <p>don't have an account? <a href="/auth">Signup</a></p>

            <button type="submit">Login</button>
        </form>
    )
}
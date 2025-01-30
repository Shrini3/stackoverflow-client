import { useState } from "react"
import axios from "axios"
//import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
//import { user } from "../features/userReducer"
//import { signinfunc } from "../main"
//import { signup_action } from "../actions/authAction"

export default function Auth() {

    //const dispatch = useDispatch()
    const navigate = useNavigate()

    const [signupDetails, setSignupDetails] = useState({
        username: "",
        email: "",
        password: ""
    })

    function handleChange(event) {
        setSignupDetails({
            ...signupDetails,
            [event.target.name] : event.target.value
        })
    } 

    function handleSubmit(e) {
        e.preventDefault()
        console.log(signupDetails)
        //dispatch(signup_action(signupDetails), navigate)
        //dispatch(signupDetails, {type: 'AUTH'})
        //dispatch(user(signupDetails))
        //localStorage.setItem("username", signupDetails.username)
        signinfunc(signupDetails)
    }

    function signinfunc(signindata) {
        axios.post(`http://localhost:5001/signin`, signindata)
        .then(res => {
            //console.log(res)
            navigate('/authlogin')
        })
        .catch(err => {
            console.log('Error:',err)
            if(err.response.status === 409) {
                alert(err.response.data.error)
            }
        })
    }

    return (
        <form className="signup-form" onSubmit={handleSubmit}> 
            <label htmlFor="username">Enter your Display Name</label>
            <input 
             type="text" 
             id="username"
             name="username"
             value={signupDetails.username}
             onChange={handleChange}
             required
             minLength="3"
             maxLength="20"
             pattern="[a-zA-Z0-9]+"
             >
             </input>
            
            <label htmlFor="email">Enter your email</label>
            <input 
             type="email" 
             id="email"
             name="email"
             value={signupDetails.email}
             onChange={handleChange}
             required
             >
             </input>
            
            <label htmlFor="password">Enter password</label>
            <input 
             type="password" 
             id="password"
             name="password"
             value={signupDetails.password}
             onChange={handleChange}
             required
             pattern="[a-zA-Z0-9]+"
             minLength="3"
             maxLength="20"
             >
             </input>

            <p>already have an account? <a href="/authlogin">Login</a></p>

            <button type="submit">Signup</button>
            <p style={{display: "none", borderColor: "red", padding: "5px", textAlign: "center"}} id="warningbox">

            </p>
        </form>
    )
}
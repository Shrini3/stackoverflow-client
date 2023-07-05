export default function Auth() {
    return (
        <form className="signup-form"> 
            <label htmlFor="username">Enter your Display Name</label>
            <input type="text" id="username"></input>
            
            <label htmlFor="email">Enter your email</label>
            <input type="text" id="email"></input>
            
            <label htmlFor="pass">Enter password</label>
            <input type="password" id="pass"></input>

            <p>already have an account? <a href="/authlogin">Login</a></p>

            <button type="submit">Signup</button>
        </form>
    )
}
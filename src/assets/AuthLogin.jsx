export default function authLogin() {
    return (
        <form className="login-form"> 
            
            <label htmlFor="email">Email</label>
            <input type="text" id="email"></input>
            
            <label htmlFor="pass">Enter password</label>
            <input type="password" id="pass"></input>

            <p>don't have an account? <a href="/auth">Signup</a></p>

            <button type="submit">Login</button>
        </form>
    )
}
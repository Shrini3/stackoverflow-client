import axios from "axios"
import jwtDecode from 'jwt-decode';

export async function checkToken() {
    const token = localStorage.getItem("Token")
    const refresh_token = localStorage.getItem("Refresh Token")
    const decodedToken = jwtDecode(token);
    const decodedRefreshToken = jwtDecode(refresh_token);
    console.log(decodedToken)
    const expiresAt = decodedToken.exp;
    if(decodedRefreshToken.exp < Date.now() / 1000) {
        localStorage.clear()
        window.location.href = "/authlogin"
    } else if (Date.now() / 1000 > expiresAt) {
        console.log('Token has expired');
        const response = await axios.get("http://localhost:5001/refreshtoken", {
            headers: {
                'Authorization' : `Bearer ${token} RefreshToken ${refresh_token}`
            }
        })
        console.log(response)
        localStorage.setItem("Token", response.data.newAccessToken)
        localStorage.setItem("Refresh Token", response.data.newRefreshToken)
    } else {
        console.log("Token is valid!")
    }
}
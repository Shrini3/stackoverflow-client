import axios from 'axios'

export function signinfunc(signindata) {
    axios.post(`http://localhost:5001/signin`, signindata)
    .then(res => {
        console.log(res.data)
    })
    .catch(err => {
        console.log('Error:',err)
    })
}

export function login(logindata) {
    axios.post("http://localhost:5001/login", logindata)
    .then(res => {
        console.log(res.data)
    }).catch(err => {
        console.log('Error:', err)
    })
}

export async function userProfileData(name) {
    try {
        const response = await axios.get("http://localhost:5001/getuserdata", {
            params: {
                username: name
            }
        })
        console.log(response.data)
        return response.data
    } catch(err) {
        console.log('Error:', err.message)
        console.log(err.response.data);
        console.log(err.response.status);
        console.log(err.response.headers);
    }
}
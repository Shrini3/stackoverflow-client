import { useParams } from "react-router-dom"
import axios from "axios"
import { useState, useEffect } from "react"
import { checkToken } from "../utils"
//import { userProfileData } from "../main.js"

export default function Profile() {
    const params = useParams() 
    const [data, setData] = useState(null)

    async function userProfileData(name) {
        try {
            await checkToken()
            const response = await axios.get("http://stackoverflow-server-production.up.railway.app:5001/getuserdata", {
                params: {
                    username: name
                },
                headers: {
                    'Authorization' : `Bearer ${localStorage.getItem("Token")} RefreshToken ${localStorage.getItem("Refresh Token")}`
                }
            })
            console.log(response.data)
            setData(response.data)
            //return await response.data
        } catch(err) {
            if(err.response) {
                console.log('Error:', err.response.data)
            } else {
                console.log("an unexpected error!")
            }
            // console.log(err.response.data);
            // console.log(err.response.status);
            //console.log(err.response.headers);
        }
    }

    useEffect(() => {        
        userProfileData(params.user)
    }, [params.user])

    if(!data) {
        return (
            <h1>Loading...</h1>
        )
    }

    function tagRender(dtags) {
        return (
            dtags.map(d => (
                <p>{d}</p>
            ))
        )
    }
    return (
        <main>
            <h2 className="profile-pic">{params.user.slice(0,1)}</h2>
            <div className="profile-div">
                <p>Name {data.username}</p>
                <p>Joined On {data.joinedOn.slice(0,10)}</p>
                <p>Interested in {tagRender(data.tags)}</p>
                <h4>About</h4>
                <p>blah bhah</p>
                <section>
                    <h4>Top Posts</h4>
                    <div>
                        
                    </div>
                </section>
            </div>
        </main>
    )
}
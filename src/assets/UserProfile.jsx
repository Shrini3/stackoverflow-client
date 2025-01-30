import { useParams } from "react-router-dom"
import axios from "axios"
import { useState, useEffect } from "react"

export default function Profile() {
    const params = useParams() 
    const [data, setData] = useState(null)

    async function userProfileData(name) {
        try {
            const response = await axios.get("http://localhost:5001/getuserprofile", {
                params: {
                    uname: name
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
        userProfileData(params.uname)
    }, [params.uname])

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
            <h2 className="profile-pic">{data.username.slice(0,1)}</h2>
            <div>
                <p>Name {data.username}</p>
                <p>Joined On {data.joinedOn.slice(0,10)}</p>
                <p>Interested in {tagRender(data.tags)}</p>
            </div>
        </main>
    )
}
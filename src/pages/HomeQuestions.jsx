import { useState, useEffect } from "react"
import { useNavigate, Link} from "react-router-dom"
import axios from "axios"

export default function HomeQuestions() {
    const navigate = useNavigate()

    const [questionArray, setQuestionArray] = useState([])

    function getQuestions(userName) {
        axios.get("http://localhost:5001/myquestions", { 
            params: {
                username: userName
            }
        })
        .then(res => {
            console.log(res.data)
            setQuestionArray(res.data)
        })
        .catch(err => {
            console.log(err)
        })
    }

    useEffect(() => {
        const user = localStorage.getItem("username")
        function checkAuth() {
            if(!user) {
                navigate("/authlogin")
            } else {
                getQuestions(localStorage.getItem("username"))
            }
        }
        
        checkAuth()
        
    }, [navigate])

    function navigateToAskQuestion() {
        navigate("/ask")
    }
    
    return (
        questionArray.length === 0 ? navigate("/auth") :
        <section className="homequestions">
            <div className="homequestions-top">
                <h2>Top questions</h2>
                <button onClick={navigateToAskQuestion}>Ask Question</button>
            </div>
            {
                questionArray.map(q => {
                    return (
                    <section className="question-bar">
                        <div className="question-bar-stats">
                            <p>{q.upvotes + q.downvotes} votes</p>
                            <p>{q.answeredby.length} Answers</p>
                        </div>
                        <div className="question-bar-info">
                            <p><Link to={`/questions/${q._id}`}>{q.Title}</Link></p>
                            <div className="question-bar-info-tags-div">
                                {
                                    q.tags.map(tag => {
                                        return (
                                        <p className="question-bar-info-tag">{tag}</p>
                                        )
                                    })
                                }
                                <div className="question-bar-info-asked"> 
                                    <p>{q.askedOn.substring(0, 10)}</p>
                                    <p><Link to={`/${q.askedBy}`}>{q.askedBy}</Link></p>
                                </div>
                            </div>
                        </div>
                    </section>
                )})
            }
        </section>
    )
}
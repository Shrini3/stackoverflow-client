import { useState, useEffect } from "react"
import { useNavigate, Link} from "react-router-dom"
import axios from "axios"

export default function HomeQuestions() {
    const navigate = useNavigate()

    const [questionArray, setQuestionArray] = useState([])
    const [filter, setFilter] = useState('latest');

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

    function getFilteredItems() {
        switch (filter) {
            case 'latest':
                return [...questionArray].sort((a, b) => new Date(b.askedOn.substring(0, 10)) - new Date(a.askedOn.substring(0, 10)));
            case 'oldest':
                return [...questionArray].sort((a, b) => new Date(a.askedOn.substring(0, 10)) - new Date(b.askedOn.substring(0, 10)));
            case 'popular':
                return [...questionArray].sort((a, b) => (b.upvotes + b.downvotes) - (a.upvotes + a.downvotes));
            default:
                return questionArray;
        }
    }

    const filteredItems = getFilteredItems()
    
    return (
        questionArray.length === 0 ? navigate("/auth") :
        <section className="homequestions">
            <div className="homequestions-top">
                <h2>Your Questions</h2>
                <button onClick={navigateToAskQuestion}>Ask Question</button>
            </div>
            <div className="homequestions-top-filterdiv">
                <button 
                    onClick={() => setFilter('latest')}
                    style={{
                        backgroundColor: filter === 'latest' ? 'black' : 'white',
                        color: filter === 'latest' ? 'white' : 'black',
                    }}
                >Latest</button>
                <button 
                    onClick={() => setFilter('oldest')}
                    style={{
                        backgroundColor: filter === 'oldest' ? 'black' : 'white',
                        color: filter === 'oldest' ? 'white' : 'black',
                    }}
                >Oldest</button>
                <button 
                    onClick={() => setFilter('popular')}
                    style={{
                        backgroundColor: filter === 'popular' ? 'black' : 'white',
                        color: filter === 'popular' ? 'white' : 'black',
                    }}
                >Popular</button>
            </div>
            {
                filteredItems.map(q => {
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
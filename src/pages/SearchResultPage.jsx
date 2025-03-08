import { useEffect, useState } from "react"
import { useSearchParams, Link } from "react-router-dom"
import axios from "axios"
import {toast, ToastContainer} from "react-toastify"

export default function SearchResultPage() {

    const [searchParams] = useSearchParams()

    const [questionArray, setQuestionArray] = useState([])
    const [filter, setFilter] = useState('latest');

    function getQuestions() {
        axios.get("http://stackoverflow-server-production.up.railway.app:5001/api/search", {
            params : {
                searchquery: searchParams.get("searchtag")
            }
        })
        .then(res => {
            if(Array.isArray(res.data)) {
                console.log(res.data)
                setQuestionArray(res.data)
            } else {
                console.log(res.data.message)
                toast.warn(res.data.message)
            }
        })
        .catch(err => {
            console.log(err)
        })
    }

    useEffect(() => {
        getQuestions()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchParams.get("searchtag")])

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
        questionArray.length === 0 ? 
            <div>
                <h3>No Result Found!!!</h3>
                <ToastContainer
                position="bottom-center"
                />
            </div> :
            <section className="homequestions">
                <div className="homequestions-top">
                    <h2>Top Questions</h2>
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
                        )
                    })
                }
            </section>
    )
}
import { useParams, Link, useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import axios from "axios"
import { toast, ToastContainer } from "react-toastify"

export default function QuestionDetails() {
    const params = useParams()
    const navigate = useNavigate()
    const [qdata, setqdata] = useState({})
    const [commentContent, setCommentContent] = useState("")

    function getQuestionData(qid) {

        axios.get("http://stackoverflow-server-production.up.railway.app:5001/getquestiondata", {
            params: {
                questionid: qid
            }
        })
        .then(res => {
            //console.log(res.data)
            setqdata(res.data)
        })
        .catch(err => {
            console.log(err)
        })
    }

    useEffect(() => {
        console.log(params.id)
        getQuestionData(params.id)
    }, [params.id])

    function submitComment() {
        if(commentContent.length < 10) {

        } else {
            axios.post("http://stackoverflow-server-production.up.railway.app:5001/postcomment", {
                comment: commentContent, 
                userID: qdata.userid, 
                username: localStorage.getItem("username"), 
                questionID: params.id
            })
            .then(res => {
                console.log(res.data)
                setCommentContent("")
            })
            .catch(err => {
                console.log(err)
            })
        }
        console.log(commentContent)
    }

    function navigateToAnswerPage() {
        navigate(`/answer/${params.id}`)
    }

    function upvote(aid) {
        if(localStorage.getItem("reputation") >= 50) {
            axios.post("http://stackoverflow-server-production.up.railway.app:5001/api/upvote", {
                qid : params.id,
                ansid : (aid) ? aid : "",
                username: localStorage.getItem("username")
            })
            .then(res => {
                console.log(res.data)
                toast.success(res.data.message)
            })
            .catch(err => {
                if(err.status === 409) {
                    toast.error(err.response.data.message)
                }
                console.log(err)
            })
        } else {
            toast.warn("You need to earn atleast 50 reputation to upvote")
        }
    }

    function downvote(aid) {
        if(localStorage.getItem("reputation") >= 50) {
            axios.post("http://stackoverflow-server-production.up.railway.app:5001/api/downvote", {
                qid: params.id,
                ansid: (aid) ? aid : "",
                username: localStorage.getItem("username")
            })
            .then(res => {
                console.log(res)
                toast.success(res.data.message)
    
            })
            .catch(err => {
                if(err.status === 409) {
                    toast.error(err.response.data.message)
                }
                console.log(err)
            })
        } else {
            toast.warn("You need to earn atleast 50 reputation to downvote")
        }
    }

    return (
        (!qdata) ? <h1>Loading...</h1> :
        <section className="question-detail-main">
            <ToastContainer
                position="bottom-center"
            />
            {   
                <section className="question-detail">
                    <h2>{qdata.Title}</h2>
                    <div class="question-detail-title-header">
                        {/* <p>Viewed { } times</p> */}
                        <button onClick={navigateToAnswerPage}>Answer</button>
                    </div>
                    <hr />
                    <div className="question-detail-answer-div">
                        <div className="question-detail-score">
                            <button onClick={() => upvote("")}>
                                <img src="../../uparrow.png" alt="uparrow" />
                            </button>
                            <h6>{qdata.upvotes + qdata.downvotes}</h6>
                            <button onClick={() => downvote("")}>
                                <img src="../../downarrow.png" alt="downarrow" />
                            </button>
                        </div>
                        <div className="question-detail-answer-body"
                            dangerouslySetInnerHTML = {{ __html: qdata.questionDescription}}
                        />
                    </div>
                    <div className="question-detail-tags-div">
                        
                        {
                        (!qdata.tags || qdata.tags.length === 0) ? <h3>Loading...</h3> :
                        qdata.tags.map(tag => {
                            return (
                                <p className="question-detail-tag">{tag}</p>
                            )
                        })
                        }
                    </div>
                    <div className="question-detail-footer-div">
                        <div className="question-detail-footer-options">
                            <p>Share</p>
                            {/* <p>Comment</p> */}
                        </div>
                        <div className="question-detail-footer-ask">
                            <p className="question-detail-askedOn-ptag"> 
                                Asked at {
                                    (!qdata.askedOn) ? <h6>Loading...</h6> :
                                    qdata.askedOn.substring(0, 10)
                                } on {
                                    (!qdata.askedOn) ? <h6>Loading...</h6> :
                                    qdata.askedOn.substring(11, 16)
                                }
                            </p>
                            <p><Link to={`/${qdata.askedBy}`}>{qdata.askedBy}</Link></p>
                        </div>
                    </div>
                </section>         
            }   
                <div className="question-detail-commentSection">
                    <label htmlFor="commentSection">
                        Add Comment
                    </label>
                    <textarea
                        id="commentSection"
                        name="commentSection"
                        value={commentContent}
                        onChange={e => setCommentContent(e.target.value)}
                        placeholder="Comment here"
                        maxLength="350"
                        minLength="10"
                        required
                    />
                    <button type="submit" onClick={submitComment}>Post</button>
                    <hr />
                </div>
                <div className="question-detail-comments">
                    {
                        (!qdata.comments) ? <h6>No comments yet!</h6> :
                            qdata.comments.map(cm => {
                                return (
                                    <>
                                        <p>{cm.comment} - <Link to={`/${cm.commentedBy}`}>{cm.commentedBy}</Link> {cm.commentedOn.toLocaleString().substring(0, 10)} at {cm.commentedOn.toLocaleString().substring(11, 16)}</p>
                                        <hr />
                                    </>
                                )
                            })
                    }
                </div>
            <h4 style={{marginLeft:"10px"}}>Answers</h4>
            {
                (!qdata.answeredby) ? <h6>No Answers yet!</h6> :
                
                qdata.answeredby.map(ans => {
                    return (
                        <section className="question-detail">
                            
                            <div className="question-detail-answer-div">
                                <div className="question-detail-score">
                                    <button onClick={() => upvote(ans._id)}>
                                        <img src="../../uparrow.png" alt="uparrow" />
                                    </button>
                                    <h6>{ans.upvotes + ans.downvotes}</h6>
                                    <button onClick={() => downvote(ans._id)}>
                                        <img src="../../downarrow.png" alt="downarrow" />
                                    </button>
                                </div>
                                <div className="question-detail-answer-body"
                                    dangerouslySetInnerHTML={{ __html: ans.answerBody }}
                                />
                            </div>
                            
                            <div className="question-detail-footer-div">
                                {/* <div className="question-detail-footer-options">
                                    <p>Share</p>
                                    {/* <p>Comment</p> 
                                </div> */}
                                
                                <div className="question-detail-footer-ask">
                                    <p className="question-detail-askedOn-ptag">
                                        Answered at {
                                            (!ans.answeredOn) ? <h6>Loading...</h6> :
                                            ans.answeredOn.substring(0, 10)
                                        } on {
                                            (!ans.answeredOn) ? <h6>Loading...</h6> :
                                            ans.answeredOn.substring(11, 16)
                                        }
                                    </p>
                                    <p><Link to={`/${ans.answerUser}`}>{ans.answerUser}</Link></p>
                                </div>
                            </div>
                        </section> 
                    )
                })
            }
        </section>
    )
}
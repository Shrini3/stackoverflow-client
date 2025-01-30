import {useState, useEffect} from 'react'
import { Link, useParams } from 'react-router-dom'
import MDeditor from "@uiw/react-md-editor"
import axios from 'axios'
import { marked } from 'marked'
import dompurify from 'dompurify'
import {ToastContainer, toast} from 'react-toastify'

function AnswerQuestion() {

    const params = useParams()
    const [qdata, setqdata] = useState({})
    const [value, setValue] = useState("")

    function getQuestionData(id) {

        axios.get("http://localhost:5001/getquestiondata", {
            params: {
                questionid: id
            }
        })
        .then(res => {
            console.log(res.data)
            setqdata(res.data)
        })
        .catch(err => {
            console.log(err)
        })
    }

    useEffect(() => {
        getQuestionData(params.qid)
    },[params.qid])

    function submitAnswer() {
        console.log(value)
        if(value.length <= 10) {
            toast.error("Answer should be longer than 10 characters")
        } else if(value.length > 1500) {
            toast.error("Answer should be less than 1500 characters")
        } else {
            let html = marked(value)
            let purifiedhtml = dompurify.sanitize(html)
            console.log(purifiedhtml)
            postAnswer(purifiedhtml)
        }
    }

    function postAnswer(html) {
        axios.post("http://localhost:5001/api/postanswer", {
            username: localStorage.getItem("username"),
            questionId: params.qid,
            ansbody: html
        })
        .then(res => {
            console.log(res.response)    
            toast.success(res.data.message)
        })
        .catch(err => {
            if(err.status === 409) {
                toast.error(err.response.data)
            } else {
                toast.error(err.response.data.error)
                console.log(err)
            }
        })
    }

    return (
        <div className='answerpage'>
            <ToastContainer
                style={{zIndex: 2000}}
                position="bottom-center"
            />
            <h2>Question</h2>
            <div className='answerpage-question'>
                <h2 style={{fontWeight: 400}}>{qdata.Title}</h2>
                <div className="answerpage-question-body"
                    dangerouslySetInnerHTML={{ __html: qdata.questionDescription }}
                />
                <div className="answerpage-tags-div">
                    {
                        (!qdata.tags || qdata.tags.length === 0) ? <h3>Loading...</h3> :
                            qdata.tags.map(tag => {
                                return (
                                    <p className="answerpage-detail-tag">{tag}</p>
                                )
                            })
                    }
                </div>
                <div className="answerpage-footer-ask">
                    <p className="answerpage-askedOn-ptag">
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

            <h3>Post your Answer</h3>
            <MDeditor
                value={value}
                onChange={setValue}
            />
            <button onClick={submitAnswer}>Submit your Answer</button>
        </div>
    )
}

export default AnswerQuestion
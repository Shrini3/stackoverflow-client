import { useState, useRef } from "react"
import { useNavigate } from "react-router-dom"
import MDeditor from "@uiw/react-md-editor"
import axios from "axios"
import { marked } from "marked"
import dompurify from "dompurify"

export default function AskQuestion() {
    const navigate = useNavigate()
    const [questiontitle, setquestiontitle] = useState("")
    const [value, setValue] = useState("")
    const [tags, setTags] = useState("")
    const errorRef = useRef(null)
    const [isVisible, setVisible] = useState(false)
    let arr = undefined

    function checkError(a, b, c) {        
        if(a.length === 0) {
            setVisible(true)
            errorRef.current.innerHTML = "question length cannot be zero"
        } else if(a.length > 200) {
            setVisible(true)
            errorRef.current.innerHTML = "question length should be more than 250 characters"
        } else if(b.length === 0) {
            setVisible(true)
            errorRef.current.innerHTML = "question description cannot be empty"
        } else if(b.length > 1500) {
            setVisible(true)
            errorRef.current.innerHTML = "question description cannot exceed 1000 characters"
        } else if(c.length === 0) {
            setVisible(true)
            errorRef.current.innerHTML = "Tags cannot be left empty, minimum one is required"
        } else {
            setVisible(false)
        }
    }

    function tagGenerator(tags) {
        let temp = tags.split(" ")
        console.log(temp)
        return temp
    }

    function handleSubmit(e) {
        e.preventDefault()
        arr = tagGenerator(tags)
        checkError(questiontitle, value, arr)
        let html = marked(value)
        let purifiedhtml = dompurify.sanitize(html)
        console.log(questiontitle + "\n" + value + "\n" + arr + "\n" + purifiedhtml)
        if(!isVisible) {
            let questionobject = {
                title: questiontitle,
                desc: purifiedhtml,
                tags: arr,
                username: localStorage.getItem("username")
            }
            postQuestion(questionobject)
        }
    }

    function postQuestion(data) {
        axios.post("http://localhost:5001/postquestion", data)
        .then(res => {
            console.log(res.data)
        }).then(() => {
            navigate("/")
        })
        .catch(err => {
            console.log("Error:",err)
        })
    }

    return (
        <section className="askquestion">
            <h1>Ask Question</h1>
            {
                isVisible &&
                <div className="askquestion-warning-div">
                    <img src = "../../warning.png" alt="warning sign" width="20" height="20"/>
                    <p className="errorMessage" ref={errorRef}></p>
                </div>
            }
            <form className="askquestion-form" onSubmit={handleSubmit}>
                <label htmlFor="title"><h3>Title</h3></label>
                <input 
                    type="text" 
                    id="title" 
                    name="title"
                    value={questiontitle}
                    onChange={e => setquestiontitle(e.target.value)}
                    placeholder="Title of your question"
                    required
                    maxLength="250"
                    //pattern="/^[a-zA-Z0-9\s\W]+$/"
                />
                <h2>Body</h2>
                <div>
                    <MDeditor
                    value={value}
                    onChange={setValue}
                    />
                    {/* <MDeditor.Markdown source={value} style={{ whiteSpace: 'pre-wrap' }} /> */}
                </div>  
                    
                <label htmlFor="tags"><h3>Tags</h3></label>
                <input 
                    type="text" 
                    id="tags"
                    name="tags"
                    value={tags}
                    required
                    placeholder="tag1 tag2 tag3 ..."
                    onChange={e => setTags(e.target.value)}
                />

                <button type="submit">
                    Submit
                </button>
            </form>
        </section>
    )
}
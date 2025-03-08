import './App.css';
import { lazy, Suspense } from 'react';
import {BrowserRouter, Routes, Route} from "react-router-dom"
import Navbar from "./components/Navbar"
import Home from "./components/Home"
import About from './components/About'
import Auth from "./assets/Auth"
import AuthLogin from "./assets/AuthLogin"
import HomeQuestions from './pages/HomeQuestions'
import AskQuestion from './assets/AskQuestion'
import Profile from './assets/Profile'
import UserProfile from './assets/UserProfile'
import AnswerQuestion from './assets/AnswerQuestion';
import HomePage from './pages/HomePage';
import SearchResultPage from './pages/SearchResultPage';
import Error from "./Error"
const QuestionDetails = lazy(() => import('./pages/QuestionDetails'))

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navbar/>} errorElement={<Error/>}>
            <Route element={<Home/>}>
              <Route index element={<HomePage/>}/>
              <Route path="/questions" element={<HomeQuestions/>}/>
              <Route path="/questions/:id" element={
                <Suspense fallback={<h1>Loading...</h1>}>
                  <QuestionDetails/>
                </Suspense>
                }
              />
              <Route path="/search" element={<SearchResultPage/>}/>
              <Route path="/answer/:qid" element={<AnswerQuestion/>}/>
              <Route path="/profile/:user" element={<Profile/>}/>
              <Route path="/:uname" element={<UserProfile/>}/>
            </Route>
            <Route path="/about" element={<About/>}/>
            <Route path="/auth" element={<Auth/>} />
            <Route path="/authlogin" element={<AuthLogin/>}/>
            <Route path="ask" element={<AskQuestion/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

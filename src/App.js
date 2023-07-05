import './App.css';
import {BrowserRouter, Routes, Route} from "react-router-dom"
import Navbar from "./components/Navbar"
import Home from "./components/Home"
import About from './components/About'
import Auth from "./assets/Auth"
import AuthLogin from "./assets/AuthLogin"

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navbar/>}>
            <Route index element={<Home/>}/>
            <Route path="/about" element={<About/>}/>
            <Route path="/auth" element={<Auth/>} />
            <Route path="/authlogin" element={<AuthLogin/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

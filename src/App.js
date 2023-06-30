import './App.css';
import {BrowserRouter, Routes, Route} from "react-router-dom"
import Navbar from "./components/Navbar"

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navbar/>}>
            <Route/>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

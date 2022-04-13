import React, { useState } from "react";
import './App.css';
import Home from './components/Home';
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Navbar from './components/Navbar';
import About from "./components/About";
import NoteState from "./context/notes/noteState";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Alert from "./components/Alert";


function App() {

  /////////////////////alerts////////////////////////////////////
  const [alert, setAlert] = useState(null);
  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type
    })
    setTimeout(() => {
      setAlert(null);
    }, 1500);
  }


  return (
    <div>
    <NoteState>
      <Router>
      <Navbar/>
      <Alert alert={alert}/>
      <div className="container">
        <Routes>
          <Route path="/" element={<Home showAlert={showAlert}/>}>
          </Route>
          <Route path="/about" element={<About />}>
          </Route>
          <Route path="/login" element={<Login showAlert={showAlert}/>}>
          </Route>
          <Route path="/signup" element={<Signup showAlert={showAlert}/>}>
          </Route>
        </Routes>
        </div>
      </Router>
      </NoteState>
    </div>
  );
}

export default App;

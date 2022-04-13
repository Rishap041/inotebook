import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

const Navbar = () => {

  
  let location = useLocation();
  let navigate = useNavigate();
const logout = ()=>{
  localStorage.removeItem('token')
  navigate("/login");
}
  

  return (
    <div>
      <nav className="navbar  navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">iNotebook</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto">
              <li className="nav-item" >
                <Link className={`nav-link ${location.pathname === "/" ? "active" : ""}`} aria-current="page" to="/">Home</Link>
              </li>
              <li className="nav-item" >
                <Link className={`nav-link ${location.pathname === "/about" ? "active" : ""}`} to="/about">About</Link>
              </li>
            </ul>
            { !localStorage.getItem('token') ?
            <form className="d-flex ">
                <Link className="btn btn-primary mx-2" to="/login" role="button">Login</Link>
              <Link className="btn btn-primary mx-2" to="/signup" role="button">Signup</Link> 
              </form> :
              <button className='btn btn-primary' onClick={logout}>Logout</button>
            }
           
          </div>
        </div>
      </nav>
    </div>
  )
}

export default Navbar
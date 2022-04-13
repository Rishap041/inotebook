import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import noteContext from '../context/notes/noteContext';

const About = () => {
 const {notes} = useContext(noteContext)
  const [user, setUser] = useState({ name: "", email: "" });
  const handleclick = async (e) => {

    const response = await fetch('http://localhost:5000/api/auth/getuser', {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      },
    });
    const data = await response.json();
    setUser({ name: data.name, email: data.email });
  }

  useEffect(() => {
    handleclick()
    console.log("check");
    // eslint-disable-next-line
  }, [])
  return (
    <div>
      <div className="card w-50  mx-auto" >
        <img src="https://www.placidsoftware.com/assets/images/user-img.png" style={{ "width": "100px", "height": "100px" }} className="card-img-top mx-auto" alt="user" />
        <div className="card-body mx-auto">
          <h5 className="card-title text-center">user info</h5>
          <p className="card-text">
            <b> Name : </b>{user.name} <br />
            <b>Email : </b>{user.email}<br />
            <b>Total Notes : </b>{notes.length}
          </p>
        </div>
        <Link to="/" className="btn btn-primary">Home</Link>
      </div>


    </div>
  )
}

export default About
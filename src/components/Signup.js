import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';


const Signup = ({showAlert}) => {
    const [creds, setCreds] = useState({ name: "", email: "", password: "", cpassword: "" });
    const navigate = useNavigate();

    const handleclick = async (e) => {
        e.preventDefault();

        const response = await fetch('http://localhost:5000/api/auth/createuser', {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name: creds.name, email: creds.email, password: creds.password })
        });
        const data = await response.json();
        console.log(data);
        if(data.success){
            localStorage.setItem('token',data.authToken);
            navigate("/");
            showAlert("Account Created Successfully","success")
        }else{
            showAlert("Invalid Details","danger")
        }

    }
    const onchange = (e) => {
        setCreds({ ...creds, [e.target.name]: e.target.value });
    }
    
    return (
        <div>
            <section className="" >
                <div className="container h-100">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col-lg-12 col-xl-11">
                            <div className="" >
                                <div className=" p-md-5">
                                    <div className="row justify-content-center">
                                        <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">

                                            <h3 className='text-center'>iNotebook</h3>
                                            <h6 className='mb-5 text-center'>Register your account</h6>

                                            <form  >

                                                <div className="d-flex flex-row align-items-center mb-2">
                                                    <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                                                    <div className="form-outline flex-fill mb-0">
                                                        <input type="text" id="form3Example1c" name="name" className="form-control" value={creds.name} onChange={onchange} required/>
                                                        <label className="form-label" htmlFor="form3Example1c">Your Name</label>
                                                    </div>
                                                </div>

                                                <div className="d-flex flex-row align-items-center mb-2">
                                                    <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                                                    <div className="form-outline flex-fill mb-0">
                                                        <input type="email" id="form3Example3c" name="email" className="form-control" value={creds.email} onChange={onchange} required />
                                                        <label className="form-label" htmlFor="form3Example3c">Your Email</label>
                                                    </div>
                                                </div>

                                                <div className="d-flex flex-row align-items-center mb-2">
                                                    <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                                                    <div className="form-outline flex-fill mb-0">
                                                        <input type="password" id="form3Example4c" name="password" className="form-control" value={creds.password} onChange={onchange}  minLength={5} required/>
                                                        <label className="form-label" htmlFor="form3Example4c">Password</label>
                                                    </div>
                                                </div>

                                                <div className="d-flex flex-row align-items-center mb-2">
                                                    <i className="fas fa-key fa-lg me-3 fa-fw"></i>
                                                    <div className="form-outline flex-fill mb-0">
                                                        <input type="password" id="form3Example4cd" name="cpassword" className="form-control" value={creds.cpassword} onChange={onchange}  minLength={5} required/>
                                                        <label className="form-label" htmlFor="form3Example4cd">Confirm Password</label>
                                                    </div>
                                                </div>


                                                <div className="d-flex justify-content-center mx-4 mb-3 my-lg-3"></div>
                                                    <button type="button" className="btn btn-primary" onClick={handleclick} disabled={creds.name.length<3 || creds.email.length<4 || creds.password.length<5 || creds.password!==creds.cpassword}>Signup
                                                    </button>
                                                

                                            </form>

                                        </div>
                                        <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">

                                            <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp" className="img-fluid" alt="Sample" />

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Signup
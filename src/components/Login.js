import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';


const Login = ({showAlert}) => {
    const [creds, setCreds] = useState({email:"",password:""});
    const navigate = useNavigate();

    const handleclick = async (e) => {
        e.preventDefault();

        const response = await fetch('http://localhost:5000/api/auth/login', {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({email:creds.email,password:creds.password})
        });
        const data = await response.json(); 
        //console.log(data);
        if(data.success){
            localStorage.setItem('token',data.authToken);
            navigate("/");
            showAlert("Logged in successfully","success");
        }else{
            showAlert("Invalid Credentials","danger");
        }
    }
    const onchange = (e) => {
        setCreds({ ...creds, [e.target.name]: e.target.value });
    }
    return (
        <div>
            <section className="vh-100">
                <div className="container py-5 h-100">
                    <div className="row d-flex align-items-center justify-content-center h-100">
                        <div className="col-md-8 col-lg-7 col-xl-6">
                            <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
                                className="img-fluid" alt="Phone" />
                        </div>
                        <div className="col-md-7 col-lg-5 col-xl-5 offset-xl-1">
                            <h3>iNotebook</h3>
                            <h6 className='mb-5'>Login into your account</h6>
                            <form onSubmit={handleclick} >

                                <div className="form-outline mb-4">
                                    <input type="email" value={creds.email} name="email" id="form1Example13" className="form-control " onChange={onchange}/>
                                    <label className="form-label"
                                        htmlFor="form1Example13">Email address</label>
                                </div>


                                <div className="form-outline mb-4">
                                    <input type="password" value={creds.password} name="password" id="form1Example23" className="form-control" onChange={onchange} />
                                    <label className="form-label" htmlFor="form1Example23">Password</label>
                                </div>

                                <div className="d-flex justify-content-around align-items-center mb-4">


                                </div>


                                <button  type="submit" className="btn btn-primary btn-lg btn-block">Login in</button>



                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Login
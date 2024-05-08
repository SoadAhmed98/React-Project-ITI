import React, { useState } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import { validEmail, validPassword } from '../component/Regex/rejex.js';
import Header from '../component/header';
import Footer from '../component/footer';

function Register(props) {
    const navigate=useNavigate ();
    const [userData , setuserData ] = useState({

        name:"",
        email: "", 
        pass: "",
        confpass:""
    })

    const [errors, setErrors] = useState({
        nameError:"",
        emailError: "", 
        passError: "",
        confpassError:""
    })

    function changeData(e)
    {
        if(e.target.name === "name")
        {
           
            setuserData({
                ...userData,
                name:e.target.value
            })

            
                setErrors({
                    ...errors,
                    
                    nameError: e.target.value.length < 3 && "Name must have at least 3 charechters"
                })

            }
            
        else if(e.target.name === "email")
        {
           
            setuserData({
                ...userData,
                email:e.target.value
            })
            setErrors({
                ...errors,
                emailError: !validEmail.test(e.target.value) ? "This Email does not match the pattern of email" : ""
            });

        }
       
        else if(e.target.name === "pass")
        {
            setuserData({
                ...userData,
                pass:e.target.value
            })

            setErrors({
                ...errors,
                passError: !validPassword.test(e.target.value) ? "Password must be at least 8 characters long and contain a mix of lowercase and uppercase letters, numbers, and at least one special character." : ""
            });

        }

        else if (e.target.name === "confpass") {
            setuserData({
                ...userData,
                confpass:e.target.value
            })
            
            setErrors({
                ...errors,
                confpassError: e.target.value !== userData.pass ? "It does not match Password" : "",
            });
           
        }
    }

    const submitData = (e) => {
        e.preventDefault();
        localStorage.setItem('user', JSON.stringify(userData));
        navigate('/login');
        console.log("Registered successfully")
    }
    return (
        <>
            <Header/>
            <div className="contact-form spad">
                    <div className="container w-50">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="contact__form__title">
                                    <h2>Sign Up</h2>
                                </div>
                            </div>
                        </div>
                        <form onSubmit={(e) => submitData(e)}>
                            <div className='login__form'>
                                <div className="row">
                                   <label htmlFor="inputName" className="col-md-4 col-form-label fw-bold label__form">Name:</label>
                                    <div className="col-md-8 ">
                                        <input type="text" id="inputName" name='name' placeholder="Your name" value={userData.name}  onChange={(e) => changeData(e)}/>
                                        <p style={{color:"#D20062"}}>{errors.nameError}</p>
                                    </div>
                                </div>
                                <div className='row'>
                                    <label htmlFor="inputEmail" className="col-md-4 col-form-label fw-bold label__form">Email:</label>
                                    <div className="col-md-8 ">
                                        <input type="text" id="inputEmail" name='email' placeholder="Your Email" value={userData.email}  onChange={(e) => changeData(e)}/>
                                        <p style={{color:"#D20062"}}>{errors.emailError}</p>
                                    </div>
                                </div>
                                <div className='row'>
                                    <label htmlFor="inputPass" className="col-md-4 col-form-label fw-bold label__form">Password:</label>
                                    <div className="col-md-8 ">
                                        <input type="password" id="inputPass" name='pass' placeholder="Your Passwod" value={userData.pass}  onChange={(e) => changeData(e)}/>
                                        <p style={{color:"#D20062"}}>{errors.passError}</p>
                                    </div>
                                </div>
                                <div className='row'>
                                    <label htmlFor="inputConfpass" className="col-md-4 col-form-label fw-bold label__form">Confirm Password:</label>
                                    <div className="col-md-8 ">
                                        <input type="password" id="inputConfpass" name='confpass' placeholder="Password Confirmation" value={userData.confpass}  onChange={(e) => changeData(e)}/>
                                        <p style={{color:"#D20062"}}>{errors.confpassError}</p>
                                     </div>
                                </div>
                                <button type="submit" className="site-btn"
                                disabled={
									!!errors.nameError ||
									!!errors.emailError ||
									!!errors.passError ||
									!!errors.confpassError ||
									!userData.name ||
									!userData.email ||
									!userData.pass ||
									!userData.confpass
								}
                                >Register</button>
                                <div className='row mt-4'>
                                    <span>Already have an account? <Link to="/login" className="auth__link">Login</Link></span>
                                </div>
                        </div>
                        </form>
                    </div>
            </div>
            <Footer/>
        </>
    );
}

export default Register;
import React, { useState } from 'react';
import Header from '../component/header';
import Footer from '../component/footer';
import { validEmail, validPassword } from '../component/Regex/rejex.js';
import { Link ,useNavigate  } from 'react-router-dom';
function Login(props) {
    const navigate=useNavigate ();
    const [user, setUser] = useState([]);
    const [userData , setuserData ] = useState({

        email:"",
        pass:""
    })

    const [errors, setErrors] = useState({
        emailError: "", 
        passError: ""
    })
    function changeData(e)
    {
        if(e.target.name === "email")
        {
           
            setuserData({
                ...userData,
                email:e.target.value
            })

            if(! validEmail.test(e.target.value) )
            {
                setErrors({
                    ...errors,
                    
                    emailError: "This Email does not match the pattern of email"
                })

            }
            else
            {
                setErrors({
                    ...errors,
                    emailError:""
                    
                })

            }
            

        }
        else if(e.target.name === "pass")
        {
            setuserData({
                ...userData,
                pass:e.target.value
            })

            if(! validPassword.test(e.target.value) )
            {
                setErrors({
                    ...errors,
                    
                    passError: "Password must be at least 8 characters and contain a mix of lowercase and uppercase letters, numbers, and at least one special character."
                })

            }
            else
            {
                setErrors({
                    ...errors,
                    passError:""
                    
                })

            }

        }
    }

    const submitData = (e) => {
        e.preventDefault();
        localStorage.setItem('user', JSON.stringify(userData));
        navigate('/');
        // console.log("Sign in successfully")
    }
    return (
        <>
            <Header/>
            <div className="contact-form spad">
                    <div className="container w-50">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="contact__form__title">
                                    <h2>Sign In</h2>
                                </div>
                            </div>
                        </div>
                        <form onSubmit={(e) => submitData(e)}>
                            <div className='login__form'>
                                <div className='row'>
                                    <label for="inputEmail" class="col-md-4 col-form-label fw-bold label__form">Email:</label>
                                    <div className="col-md-8 ">
                                            <input type="text" id="inputEmail" name='email' placeholder="Your Email" value={userData.email} onChange={(e) => changeData(e)}/>
                                            <p style={{color:"#D20062"}}>{errors.emailError}</p>
                                    </div>
                                </div>    
                                <div className="row">
                                <label for="inputPass" class="col-md-4 col-form-label fw-bold label__form">Password:</label>
                                    <div className="col-md-8 ">
                                        <input type="password" id="inputPass" name="pass" placeholder="Your Password" value={userData.pass}  onChange={(e) => changeData(e)}/>
                                        <p style={{color:"#D20062"}}>{errors.passError}</p>
                                    </div>
                                </div>
                               
                                <button type="submit" class="site-btn" 
                                disabled={
                                    errors.emailError
                                     || errors.passError 
                                     || userData.email == "" 
                                     || userData.pass==""
                                     }
                                >Login</button>

                                <div className='row mt-4'>
                                    <span>Don't have an account? <Link to="/register" className="auth__link">Register</Link></span>
                                </div>
                        </div>
                        </form>
                    </div>
            </div>
            <Footer/>
        </>
    );
}

export default Login;
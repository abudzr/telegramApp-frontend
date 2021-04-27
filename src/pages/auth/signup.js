import React, { useState } from 'react'
// import { Link } from 'react-router-dom'
import './auth.css'
import Button from '../../components/Button'

function SignUp(props) {
    const [isPasswordShow, setIsPasswordShow] = useState(false);

    const tooglePasswordVisibility = () => {
        setIsPasswordShow(!isPasswordShow)
    }

    const handleback = () => {
        props.history.push('/login')
    }

    return (
        <div className="bg-auth">
            <div className="card-auth">
                <div className="container">
                    <div className="text-title-auth">
                        <i className="fa fa-angle-left" onClick={handleback} />
                        <h2 className="title-auth">Register</h2>
                    </div>
                    <p className="sub-title-auth">Let’s create your account!</p>

                    <form className="mt-4">
                        <div className="form-group">
                            <label htmlFor="name">Name</label>
                            <input
                                type="text"
                                className="form-control mt-1"
                                name="name"
                                id="name"
                                placeholder="Enter your name"
                            // value={data.email}
                            // onChange={handleFormChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                className="form-control mt-1"
                                name="email"
                                id="email"
                                placeholder="Enter your email adress"
                            // value={data.email}
                            // onChange={handleFormChange}
                            />
                        </div>
                        <div className="form-group mt-4 password-input">
                            <label htmlFor="password">Password</label>
                            <input
                                type={(isPasswordShow) ? "text" : "password"}
                                className="form-control mt-1"
                                name="password"
                                id="password"
                                placeholder="Enter your password"
                            // value={data.password}
                            // onChange={handleFormChange}
                            />
                            <i className={`fa ${isPasswordShow ? "fa-eye-slash" : "fa-eye"}  password-icon`} onClick={tooglePasswordVisibility} />
                        </div>

                        <Button title="Register" btn="btn-auth" />
                        <div className="d-flex mt-4 mb-4 text-hr">
                            <hr />
                            <p>Register with</p>
                            <hr />
                        </div>
                        <div className="google-btn">
                            <Button title="Google" btn="btn-google" />
                            <i className="fab fa-google" />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default SignUp

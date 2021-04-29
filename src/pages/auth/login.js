import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import './auth.css'
import Button from '../../components/Button'
import Swal from 'sweetalert2'
import axios from 'axios'

function Login(props) {
    const [isPasswordShow, setIsPasswordShow] = useState(false);
    const [data, setData] = useState({
        email: "",
        password: "",
    });

    const tooglePasswordVisibility = () => {
        setIsPasswordShow(!isPasswordShow)
    }

    const handleFormChange = (event) => {
        const dataNew = {
            ...data,
        };
        dataNew[event.target.name] = event.target.value;
        setData(dataNew);
    };

    const handleLogin = (event) => {
        event.preventDefault();
        const url = process.env.REACT_APP_API_API
        axios.post(`${url}/users/auth/login`, data)
            .then(res => {
                console.log(res);
                localStorage.setItem("id", res.data.data.id)
                localStorage.setItem("token", res.data.data.token)
                Swal.fire("Success", res.data.message, "success");
                props.history.push('/')
            })
            .catch(err => {
                console.log(err);
                Swal.fire("Error", "Login Failed", "error");
            })
    }

    return (
        <div className="bg-auth">
            <div className="card-auth">
                <div className="container">
                    <h2 className="title-auth">Login</h2>
                    <p className="sub-title-auth">Hi, Welcome back!</p>

                    <form className="mt-4">
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                className="form-control mt-1"
                                name="email"
                                id="email"
                                placeholder="Enter your email adress"
                                // value={data.email}
                                onChange={handleFormChange}
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
                                onChange={handleFormChange}
                            />
                            <i className={`fa ${isPasswordShow ? "fa-eye-slash" : "fa-eye"}  password-icon`} onClick={tooglePasswordVisibility} />
                        </div>
                        <div className="text-right">
                            <Link to="/forgot-password">Forgot Password?</Link>
                        </div>
                        <Button title="Login" btn="btn-auth" onClick={handleLogin} />
                        <div className="d-flex mt-4 mb-4 text-hr">
                            <hr />
                            <p>Login with</p>
                            <hr />
                        </div>
                        <div className="google-btn">
                            <Button title="Google" btn="btn-google" />
                            <i className="fab fa-google" />
                        </div>
                        <p className="text-center mt-5 text-account">Don’t have an account? <Link to="signup">Sign Up</Link> </p>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login

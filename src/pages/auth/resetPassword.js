import React, { useState, useEffect } from 'react'
// import { Link } from 'react-router-dom'
import './auth.css'
import Button from '../../components/Button'
// import qs from 'query-string'
import Swal from 'sweetalert2'
import axios from 'axios'

function ResetPassword({ match, history }) {
    const [isPasswordShow, setIsPasswordShow] = useState(false);
    const [isPasswordShow2, setIsPasswordShow2] = useState(false);
    const [email, setEmail] = useState("")
    const [token, setToken] = useState("")
    const [data, setData] = useState({
        password: "",
        confirmPassword: "",
    });

    const tooglePasswordVisibility = () => {
        setIsPasswordShow(!isPasswordShow)
    }
    const tooglePasswordVisibility2 = () => {
        setIsPasswordShow2(!isPasswordShow2)
    }
    const handleFormChange = (event) => {
        const dataNew = {
            ...data,
        };
        dataNew[event.target.name] = event.target.value;
        setData(dataNew);
    };

    const handleReset = (event) => {
        event.preventDefault();
        const url = process.env.REACT_APP_API_API
        console.log(url);
        axios.put(`${url}/users/auth/reset-password/new?email=${email}&token=${token}`, {
            password: data.password,
            confirmPassword: data.confirmPassword
        })
            .then(res => {
                // console.log(res);
                Swal.fire("Success", res.data.message, "success");
                history.push('/login')
            })
            .catch(err => {
                console.log(err);
                Swal.fire("Error", "Reset Password Failed", "error");
            })
    }

    useEffect(() => {
        const urlEmail = match.params.email
        const urlToken = match.params.token
        setEmail(urlEmail);
        setToken(urlToken)
    }, [match])

    return (
        <div className="bg-auth">
            <div className="card-auth">
                <div className="container">
                    <h2 className="title-auth">Reset Password</h2>
                    <p className="sub-title-auth">Enter your new password</p>

                    <form className="mt-4">
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
                        <div className="form-group mt-4 password-input">
                            <label htmlFor="password">Confirm Password</label>
                            <input
                                type={(isPasswordShow2) ? "text" : "password"}
                                className="form-control mt-1"
                                name="confirmPassword"
                                id="confirmPassword"
                                placeholder="Enter your confirm password"
                                // value={data.password}
                                onChange={handleFormChange}
                            />
                            <i className={`fa ${isPasswordShow2 ? "fa-eye-slash" : "fa-eye"}  password-icon`} onClick={tooglePasswordVisibility2} />
                        </div>
                        <Button title="Reset Password" btn="btn-auth" onClick={handleReset} />
                    </form>
                </div>
            </div>
        </div>
    )
}

export default ResetPassword

import React, { useState } from 'react'
// import { Link } from 'react-router-dom'
import './auth.css'
import Button from '../../components/Button'

function ResetPassword(props) {
    const [isPasswordShow, setIsPasswordShow] = useState(false);
    const [isPasswordShow2, setIsPasswordShow2] = useState(false);

    const tooglePasswordVisibility = () => {
        setIsPasswordShow(!isPasswordShow)
    }
    const tooglePasswordVisibility2 = () => {
        setIsPasswordShow2(!isPasswordShow2)
    }

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
                            // onChange={handleFormChange}
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
                            // onChange={handleFormChange}
                            />
                            <i className={`fa ${isPasswordShow2 ? "fa-eye-slash" : "fa-eye"}  password-icon`} onClick={tooglePasswordVisibility2} />
                        </div>
                        <Button title="Reset Password" btn="btn-auth" />
                    </form>
                </div>
            </div>
        </div>
    )
}

export default ResetPassword

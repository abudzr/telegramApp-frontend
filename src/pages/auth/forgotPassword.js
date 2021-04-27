import React, { useState } from 'react'
// import { Link } from 'react-router-dom'
import './auth.css'
import Button from '../../components/Button'

function ForgotPassword(props) {

    const handleback = () => {
        props.history.push('/login')
    }

    return (
        <div className="bg-auth">
            <div className="card-auth">
                <div className="container">
                    <div className="text-title-auth">
                        <i className="fa fa-angle-left" onClick={handleback} />
                        <h2 className="title-auth">Forgot Password</h2>
                    </div>
                    <p className="sub-title-auth">You’ll get messages soon on your e-mail </p>

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
                            // onChange={handleFormChange}
                            />
                        </div>
                        <Button title="Send" btn="btn-auth" />
                    </form>
                </div>
            </div>
        </div>
    )
}

export default ForgotPassword

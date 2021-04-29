import React, { useState } from 'react'
// import { Link } from 'react-router-dom'
import './auth.css'
import Button from '../../components/Button'
import Swal from 'sweetalert2'
import axios from 'axios'

function ForgotPassword(props) {
    const [data, setData] = useState({
        email: ""
    });

    const handleback = () => {
        props.history.push('/login')
    }

    const handleFormChange = (event) => {
        const dataNew = {
            ...data,
        };
        dataNew[event.target.name] = event.target.value;
        setData(dataNew);
    };

    const handleForgot = (event) => {
        event.preventDefault();
        const url = process.env.REACT_APP_API_API
        axios.post(`${url}/users/auth/forgot-password`, data)
            .then(res => {
                console.log(res);
                Swal.fire("Success", res.data.message, "success");
                props.history.push('/login')
            })
            .catch(err => {
                console.log(err);
                Swal.fire("Error", "Reset Password Failed", "error");
            })
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
                                onChange={handleFormChange}
                            />
                        </div>
                        <Button title="Send" btn="btn-auth" onClick={handleForgot} />
                    </form>
                </div>
            </div>
        </div>
    )
}

export default ForgotPassword

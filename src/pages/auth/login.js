import React, { useState } from 'react'
import './auth.css'
import Button from '../../components/Button'
import Swal from 'sweetalert2'
import { Link, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../../configs/redux/actions/user";
import * as Yup from 'yup';
import { useFormik } from "formik";

function Login() {
    const history = useHistory();

    const dispatch = useDispatch();

    const [isPasswordShow, setIsPasswordShow] = useState(false);
    const tooglePasswordVisibility = () => {
        setIsPasswordShow(!isPasswordShow)
    }

    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        validationSchema: Yup.object({
            email: Yup.string()
                .email("Invalid email format")
                .required("Required!"),
            password: Yup.string()
                .min(8, "Minimum 8 characters")
                .required("Required!")
        }),
        onSubmit: values => {
            dispatch(login(values))
                .then((res) => {
                    Swal.fire({
                        title: "Success!",
                        text: res,
                        icon: "success",
                        confirmButtonText: "Ok",
                        confirmButtonColor: "#ffba33",
                    }).then((result) => {
                        if (result.isConfirmed) {
                            history.push("/");
                        } else {
                            history.push("/");
                        }
                    });
                })
                .catch((err) => {
                    Swal.fire({
                        title: "Error!",
                        text: err,
                        icon: "error",
                        confirmButtonText: "Ok",
                        confirmButtonColor: "#6a4029",
                    });
                });
        }
    });

    return (
        <div className="bg-auth">
            <div className="card-auth">
                <div className="container">
                    <h2 className="title-auth">Login</h2>
                    <p className="sub-title-auth">Hi, Welcome back!</p>

                    <form className="mt-4" onSubmit={formik.handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                className="form-control mt-1"
                                name="email"
                                id="email"
                                placeholder="Enter your email adress"
                                value={formik.values.email}
                                onChange={formik.handleChange}
                            />
                            {formik.errors.email && formik.touched.email && (
                                <p className="error">{formik.errors.email}</p>
                            )}
                        </div>
                        <div className="form-group mt-4 password-input">
                            <label htmlFor="password">Password</label>
                            <input
                                type={(isPasswordShow) ? "text" : "password"}
                                className="form-control mt-1"
                                name="password"
                                id="password"
                                placeholder="Enter your password"
                                value={formik.values.password}
                                onChange={formik.handleChange}
                            />
                            {formik.errors.password && formik.touched.password && (
                                <p className="error">{formik.errors.password}</p>
                            )}
                            <i className={`fa ${isPasswordShow ? "fa-eye-slash" : "fa-eye"}  password-icon`} onClick={tooglePasswordVisibility} />
                        </div>
                        <div className="text-right">
                            <Link to="/forgot-password">Forgot Password?</Link>
                        </div>
                        <Button title="Login" btn="btn-auth" />
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

import React, { useState } from 'react'
// import { Link } from 'react-router-dom'
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signUp } from "../../configs/redux/actions/user";
import './auth.css'
import Button from '../../components/Button'
import Swal from 'sweetalert2'
import * as Yup from 'yup';
import { useFormik } from "formik";

// import axios from 'axios'

function SignUp(props) {
    const formik = useFormik({
        initialValues: {
            fullName: "",
            email: "",
            password: "",
        },
        validationSchema: Yup.object({
            fullName: Yup.string()
                .min(2, "Mininum 2 characters")
                .max(15, "Maximum 15 characters")
                .required("Required!"),
            email: Yup.string()
                .email("Invalid email format")
                .required("Required!"),
            password: Yup.string()
                .min(8, "Minimum 8 characters")
                .required("Required!")
            // confirm_password: Yup.string()
            //     .oneOf([Yup.ref("password")], "Password's not match")
            //     .required("Required!")
        }),
        onSubmit: values => {
            dispatch(signUp(values))
                .then((res) => {
                    Swal.fire({
                        title: "Success!",
                        text: res,
                        icon: "success",
                        confirmButtonText: "Ok",
                        confirmButtonColor: "#ffba33",
                    }).then((result) => {
                        if (result.isConfirmed) {
                            history.push("/login");
                        } else {
                            history.push("/login");
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
            // alert(JSON.stringify(values, null, 2));
        }
    });
    const history = useHistory();

    const dispatch = useDispatch();

    const [isPasswordShow, setIsPasswordShow] = useState(false);


    const handleback = () => {
        props.history.push('/login')
    }

    const tooglePasswordVisibility = () => {
        setIsPasswordShow(!isPasswordShow)
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

                    <form className="mt-4" onSubmit={formik.handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="fullName">Name</label>
                            <input
                                type="text"
                                className="form-control"
                                name="fullName"
                                id="fullName"
                                placeholder="Enter your name"
                                value={formik.values.fullName}
                                onChange={formik.handleChange}
                            // onChange={handleFormChange}
                            />
                            {formik.errors.fullName && formik.touched.fullName && (
                                <p className="error">{formik.errors.fullName}</p>
                            )}
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                className="form-control"
                                name="email"
                                id="email"
                                placeholder="Enter your email adress"
                                value={formik.values.email}
                                onChange={formik.handleChange}
                            // value={data.email}
                            // onChange={handleFormChange}
                            />
                            {formik.errors.email && formik.touched.email && (
                                <p className="error">{formik.errors.email}</p>
                            )}
                        </div>
                        <div className="form-group password-input">
                            <label htmlFor="password">Password</label>
                            <input
                                type={(isPasswordShow) ? "text" : "password"}
                                className="form-control"
                                name="password"
                                id="password"
                                placeholder="Enter your password"
                                value={formik.values.password}
                                onChange={formik.handleChange}
                            // value={data.password}
                            // onChange={handleFormChange}
                            />
                            {formik.errors.password && formik.touched.password && (
                                <p className="error">{formik.errors.password}</p>
                            )}
                            <i className={`fa ${isPasswordShow ? "fa-eye-slash" : "fa-eye"}  password-icon`} onClick={tooglePasswordVisibility} />
                        </div>
                        {/* onClick={handleSignUp} */}
                        <Button title="Register" btn="btn-auth" />
                        <div className="d-flex mt-2 mb-2 text-hr">
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

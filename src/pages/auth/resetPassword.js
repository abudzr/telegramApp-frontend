import React, { useState, useEffect } from 'react'
import './auth.css'
import Button from '../../components/Button'
import Swal from 'sweetalert2'
import { useDispatch } from "react-redux";
import { reset } from "../../configs/redux/actions/user";
import * as Yup from 'yup';
import { useFormik } from "formik";

function ResetPassword({ match, history }) {
    const dispatch = useDispatch();
    const [isPasswordShow, setIsPasswordShow] = useState(false);
    const [isPasswordShow2, setIsPasswordShow2] = useState(false);
    const [email, setEmail] = useState("")
    const [token, setToken] = useState("")

    const tooglePasswordVisibility = () => {
        setIsPasswordShow(!isPasswordShow)
    }
    const tooglePasswordVisibility2 = () => {
        setIsPasswordShow2(!isPasswordShow2)
    }

    const formik = useFormik({
        initialValues: {
            password: "",
            confirmPassword: "",
        },
        validationSchema: Yup.object({
            password: Yup.string()
                .min(8, "Minimum 8 characters")
                .required("Required!"),
            confirmPassword: Yup.string()
                .oneOf([Yup.ref("password")], "Password's not match")
                .required("Required!")
        }),
        onSubmit: values => {
            dispatch(reset(email, token, values))
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
        }
    });

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

                    <form className="mt-4" onSubmit={formik.handleSubmit}>
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
                        <div className="form-group mt-4 password-input">
                            <label htmlFor="password">Confirm Password</label>
                            <input
                                type={(isPasswordShow2) ? "text" : "password"}
                                className="form-control mt-1"
                                name="confirmPassword"
                                id="confirmPassword"
                                placeholder="Enter your confirm password"
                                value={formik.values.confirmPassword}
                                onChange={formik.handleChange}
                            // value={data.confirmPassword}
                            // onChange={handleFormChange}
                            />
                            {formik.errors.confirmPassword && formik.touched.confirmPassword && (
                                <p className="error">{formik.errors.confirmPassword}</p>
                            )}
                            <i className={`fa ${isPasswordShow2 ? "fa-eye-slash" : "fa-eye"}  password-icon`} onClick={tooglePasswordVisibility2} />
                        </div>
                        {/* onClick={handleReset} */}
                        <Button title="Reset Password" btn="btn-auth" />
                    </form>
                </div>
            </div>
        </div>
    )
}

export default ResetPassword

import React from 'react'
import './auth.css'
import Button from '../../components/Button'
import Swal from 'sweetalert2'
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { activate } from "../../configs/redux/actions/user";
import * as Yup from 'yup';
import { useFormik } from "formik";

function ForgotPassword(props) {
    const history = useHistory();

    const dispatch = useDispatch();

    const handleback = () => {
        props.history.push('/login')
    }

    const formik = useFormik({
        initialValues: {
            email: "",
        },
        validationSchema: Yup.object({
            email: Yup.string()
                .email("Invalid email format")
                .required("Required!"),
        }),
        onSubmit: values => {
            dispatch(activate(values))
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

    return (
        <div className="bg-auth">
            <div className="card-auth">
                <div className="container">
                    <div className="text-title-auth">
                        <i className="fa fa-angle-left" onClick={handleback} />
                        <h2 className="title-auth">Forgot Password</h2>
                    </div>
                    <p className="sub-title-auth">You’ll get messages soon on your e-mail </p>

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
                        <Button title="Send" btn="btn-auth" />
                    </form>
                </div>
            </div>
        </div>
    )
}

export default ForgotPassword

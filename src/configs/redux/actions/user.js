import axios from "axios";
import axiosApiInstance from "../../../helpers/axios";

const signUpRequest = () => {
  return { type: "SIGN_UP_REQUEST" };
};

const signUpSuccess = (data) => {
  return { type: "SIGN_UP_SUCCESS", payload: data };
};

const signUpFailure = (error) => {
  return { type: "SIGN_UP_FAILURE", payload: error };
};

const resetRequest = () => {
  return { type: "RESET_REQUEST" };
};

const resetSuccess = () => {
  return { type: "RESET_SUCCESS" };
};

const resetFailure = (error) => {
  return { type: "RESET_FAILURE", payload: error };
};

export const signUp = (data) => (dispatch) => {
  return new Promise((resolve, reject) => {
    const Url = process.env.REACT_APP_API_API;
    dispatch(signUpRequest());
    axios
      .post(`${Url}/users/`, data)
      .then((res) => {
        dispatch(signUpSuccess(res.data.data));
        resolve(res.data.message);
      })
      .catch((err) => {
        dispatch(signUpFailure(err.response.data.message));
        reject(new Error(err.response.data.message));
      });
  });
};

export const verify = (email, token) => (dispatch) => {
  return new Promise((resolve, reject) => {
    const Url = process.env.REACT_APP_API_API;
    axios
      .get(`${Url}/users/auth/verify/?email=${email}&token=${token}`)
      .then((res) => {
        resolve(res.data.message);
      })
      .catch((err) => {
        reject(new Error(err.response.data.message));
      });
  });
};

export const login = (data) => (dispatch) => {
  return new Promise((resolve, reject) => {
    const Url = process.env.REACT_APP_API_API;
    axios
      .post(`${Url}/users/auth/login`, data)
      .then((res) => {
        dispatch({ type: "LOGIN", payload: res.data.data });
        localStorage.setItem("id", res.data.data.id)
        localStorage.setItem("token", res.data.data.token);
        resolve(res.data.message);
      })
      .catch((err) => {
        reject(err.response.data.message);
      });
  });
};

export const getUser = () => {
  return (dispatch) => {
    const Url = process.env.REACT_APP_API_API;
    axiosApiInstance.get(`${Url}/users/find-one`).then((res) => {
      dispatch({
        type: "GET_USER",
        payload: res.data.data[0],
        role: res.data.data[0].role,
      });
    });
  };
};

export const getAllUser = () => {
  return (dispatch) => {
    const Url = process.env.REACT_APP_API_API;
    axiosApiInstance.get(`${Url}/users`).then((res) => {
      dispatch({
        type: "GET_ALL_USER",
        payload: res.data.data
      });
    });
  };
};

export const findUser = () => (dispatch) => {
  return new Promise((resolve, reject) => {
    const Url = process.env.REACT_APP_API_API;
    axiosApiInstance.get(`${Url}/users/find-one`).then((res) => {
      resolve(res.data.data[0]);
    });
  });
};
// http://localhost:8080/api/v1/users/find-user/?id=2
export const findUserById = (id) => (dispatch) => {
  return new Promise((resolve, reject) => {
    const Url = process.env.REACT_APP_API_API;
    axiosApiInstance.get(`${Url}/users/find-user/?id=${id}`).then((res) => {
      resolve(res.data.data[0]);
    });
  });
};



export const update = (data, id) => (dispatch) => {
  return new Promise((resolve, reject) => {
    const Url = process.env.REACT_APP_API_API;
    axiosApiInstance
      .patch(`${Url}/users/${id}`, data)
      .then((res) => {
        resolve(res.data.message);
      })
      .catch((err) => {
        reject(new Error(err.response.data.message));
      });
  });
};

export const updatePassword = (data, id) => (dispatch) => {
  return new Promise((resolve, reject) => {
    const Url = process.env.REACT_APP_API_API;
    axiosApiInstance
      .put(`${Url}/users/edit-password/${id}`, data)
      .then((res) => {
        resolve(res.data.message);
      })
      .catch((err) => {
        reject(new Error(err.response.data.message));
      });
  });
};

export const activate = ({ email }) => (dispatch) => {
  return new Promise((resolve, reject) => {
    const Url = process.env.REACT_APP_API_API;
    dispatch(resetRequest());
    axios
      .post(`${Url}/users/auth/forgot-password`, { email })
      .then((res) => {
        dispatch(resetSuccess());
        resolve(res.data.message);
      })
      .catch((err) => {
        dispatch(resetFailure(err.response.data.message));
        reject(new Error(err.response.data.message));
      });
  });
};

export const reset = (email, token, { password, confirmPassword }) => (dispatch) => {
  return new Promise((resolve, reject) => {
    const Url = process.env.REACT_APP_API_API;
    axios
      .put(`${Url}/users/auth/reset-password/new?email=${email}&token=${token}`, {
        password,
        confirmPassword,
      })
      .then((res) => {
        resolve(res.data.message);
      })
      .catch((err) => {
        reject(err.response.data.message);
      });
  });
};

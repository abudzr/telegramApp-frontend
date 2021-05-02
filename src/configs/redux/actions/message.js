// import axios from "axios";
import axiosApiInstance from "../../../helpers/axios";

export const getMessages = (idFrom, idTo) => (dispatch) => {
    return new Promise((resolve, reject) => {
        const Url = process.env.REACT_APP_API_API;
        axiosApiInstance
            .get(`${Url}/messages/${idFrom}/${idTo}`)
            .then((res) => {
                dispatch({
                    type: "GET_MESSAGES",
                    payload: res.data.data,
                });
                resolve(res.data.data);
            })
            .catch((err) => {
                reject(new Error(err.response.data.message));
            });
    });
};

export const deleteHistoryChat = (id) => (dispatch) => {
    return new Promise((resolve, reject) => {
        const Url = process.env.REACT_APP_API_API;
        axiosApiInstance
            .delete(`${Url}/messages/${id}`)
            .then((res) => {
                dispatch({
                    type: "DELETE_MESSAGES",
                    payload: res.data.data,
                });
                resolve(res.data.data);
            })
            .catch((err) => {
                reject(new Error(err.response.data.message));
            });
    });
};
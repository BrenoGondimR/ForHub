import axios from "axios";
import {
    createReservaUrl,
    getReservaUrl,
    updateReservaUrl,
    deleteReservaUrl,
    getAllReservasUrl,
    getReservasByUserUrl
} from "@/constants/config";

export const createReserva = (data) => {
    return axios.post(createReservaUrl, data);
};

export const getReserva = (id) => {
    return axios.get(getReservaUrl(id));
};

export const updateReserva = (id, data) => {
    return axios.put(updateReservaUrl(id), data);
};

export const deleteReserva = (id) => {
    return axios.delete(deleteReservaUrl(id));
};

export const getAllReservas = (userID) => {
    return axios.get(getAllReservasUrl, { params: { userID } });
};

export const getReservasByUser = (userId) => {
    return axios.get(getReservasByUserUrl(userId));
};
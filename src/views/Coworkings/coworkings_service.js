import axios from "axios";
import {
    createCoworkingUrl,
    getCoworkingUrl,
    updateCoworkingUrl,
    deleteCoworkingUrl,
    getAllCoworkingUrl
} from "@/constants/config";

export const createCoworking = (data) => {
    return axios.post(createCoworkingUrl, data);
};

export const getCoworking = (id) => {
    return axios.get(getCoworkingUrl(id));
};

export const updateCoworking = (id, data) => {
    return axios.put(updateCoworkingUrl(id), data);
};

export const deleteCoworking = (id) => {
    return axios.delete(deleteCoworkingUrl(id));
};

export const getAllCoworking = () => {
    console.log(getAllCoworkingUrl);
    return axios.get(getAllCoworkingUrl);
};

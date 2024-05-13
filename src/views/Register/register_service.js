import axios from "axios";
import {createUserUrl} from "@/constants/config";

export const createAccount = (data) => {
    return axios.post(createUserUrl, data, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
};

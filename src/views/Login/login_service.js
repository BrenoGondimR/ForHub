import axios from "axios";
import {loginUrl} from "@/constants/config";

export const userLogin = (data) => {
    return axios.post(loginUrl, data);
};
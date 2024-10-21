import axios from 'axios';
import {getUserNameByIdUrl} from "@/constants/config";

export const getUserName = (id, data) => {
  return axios.get(getUserNameByIdUrl(id), data);
};
import axios from 'axios';
import {getUserNameByIdUrl} from "@/constants/config";

export const getUserName = (id) => {
  return axios.get(getUserNameByIdUrl(id));
};
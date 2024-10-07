import axios from "axios";
import {
    createClientUrl,
    getClientUrl,
    updateClientUrl,
    deleteClientUrl,
    getAllClientsUrl
} from "@/constants/config";

export const createClient = (data) => {
    return axios.post(createClientUrl, data);
};

export const getClient = (id) => {
    return axios.get(getClientUrl(id));
};

export const updateClient = (id, data) => {
    return axios.put(updateClientUrl(id), data);
};

export const deleteClient = (id) => {
    return axios.delete(deleteClientUrl(id));
};

// Função para buscar todos os clientes com base no userID
export const getAllClients = (userID) => {
    return axios.get(getAllClientsUrl, { params: { userID } });
};

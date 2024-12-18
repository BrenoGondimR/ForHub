let apisUrl;

if (window.location.host === "for-hub.vercel.app") {
  apisUrl = 'https://apisforhub.onrender.com/'; // Usando 'https' após configurar SSL
} else {
  apisUrl = 'http://localhost:5001/'; // 'http' está correto apenas para desenvolvimento local
}

export const createUserUrl = apisUrl + 'users';
export const loginUrl = apisUrl + 'login';
export const createCoworkingUrl = apisUrl + 'coworking-spaces';
export const getCoworkingUrl = (id) => `${apisUrl}coworking-spaces/${id}`;
export const updateCoworkingUrl = (id) => `${apisUrl}coworking-spaces/${id}`;
export const deleteCoworkingUrl = (id) => `${apisUrl}coworking-spaces/${id}`;
export const getAllCoworkingUrl = apisUrl + 'coworking-spaces';
export const getAllCoworkingsPlacesUrl = apisUrl + 'coworking-spaces-location';

// Rotas para operações de clientes
export const createClientUrl = apisUrl + 'clients';
export const getClientUrl = (id) => `${apisUrl}clients/${id}`;
export const updateClientUrl = (id) => `${apisUrl}clients/${id}`;
export const deleteClientUrl = (id) => `${apisUrl}clients/${id}`;
export const getAllClientsUrl = apisUrl + 'clients';

// Novas rotas para operações de reservas
export const createReservaUrl = apisUrl + 'reservas';
export const getReservaUrl = (id) => `${apisUrl}reservas/${id}`;
export const updateReservaUrl = (id) => `${apisUrl}reservas/${id}`;
export const deleteReservaUrl = (id) => `${apisUrl}reservas/${id}`;
export const getAllReservasUrl = apisUrl + 'reservas';
export const getAllConfirmedReservasById = apisUrl + 'reservas-confirmadas';
export const getReservasByUserUrl = (userId) => `${apisUrl}reservas/user/${userId}`;
export const getUserNameByIdUrl = (userId) => `${apisUrl}users/${userId}`;

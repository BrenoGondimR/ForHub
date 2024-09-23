let apisUrl;

if (window.location.host === "https://for-hub.vercel.app") {
  apisUrl = 'https://apisforhub.onrender.com'; // Usando 'https' após configurar SSL
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

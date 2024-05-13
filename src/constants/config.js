let apisUrl;

if (window.location.host === "easymanagepro.com.br") {
  apisUrl = 'https://apiseasymanage.online/'; // Usando 'https' após configurar SSL
} else {
  apisUrl = 'http://localhost:5001/'; // 'http' está correto apenas para desenvolvimento local
}


export const createUserUrl = apisUrl + 'users/';
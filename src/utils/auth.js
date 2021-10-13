export const BASE_URL = 'https://api.antiqueinvest.ru';

const responseCheck = (response) => response.ok ? response : Promise.reject(`Ошибка ${response.status}`);

export const register = (name, email, password) => {
  return fetch(`${BASE_URL}/signup`, {
    // mode: "no-cors",
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, email, password })
  })
    .then(responseCheck)
    .then((res) => {
      if(res.ok) {
        return res.json();
      }
      return Promise.reject(`Error: ${res.status}`);
    });  
};

export const authorize = (email, password) => {
  return fetch(`${BASE_URL}/signin`, {
    // mode: "no-cors",
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password })
  })
    .then(responseCheck)
    .then((res) => {
        if (res.ok){
            return res.json();
        } else {
            return;
        }
    }) 
};


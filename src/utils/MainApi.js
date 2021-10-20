const responseCheck = (response) => response.ok ? response : Promise.reject(`Ошибка ${response.status}`);

export class MainApi {
  constructor({address, token}) {
    this._address = address;
    this._token = `Bearer ${localStorage.getItem('token')}`;
  }


  _checkResponse(res) {
    if (res.ok) {
        // console.log('_checkResponse', this._token)
        return res.json();
    }
    return Promise.reject(`Ошибка ${res.status}`);
}


  delSavedLots(data) {
    return fetch(`${this._address}/cards/${data._id}`,{
      // mode: "no-cors",
      method: 'DELETE',
      headers: {
        authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
    .then(this._checkResponse)
  }

  getSavedLots(data) {
    // return fetch(`${this._address}/cards`,{
      return fetch(`https://api.antiqueinvest.ru/cards`,{
      // mode: "no-cors",
      method: 'GET',
      headers: {
        // authorization: this._token
        authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
    .then(this._checkResponse)
  }



  getUserInfo(token) {
    return fetch(`${this._address}/users/me`,{
      // mode: "no-cors",
      method: 'GET',
      headers: {
        // authorization: this._token
        authorization: `Bearer ${token}`
      }
    })
    .then(this._checkResponse)

  }

  renewUserInfo(data) {
    return fetch(`${this._address}/users/me`,{
      // mode: "no-cors",
      method: 'PATCH',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        name: data.name,
        email: data.email
      })
    })
  }

  getAllUsers() {
    return fetch(`https://api.antiqueinvest.ru/users`,{
      // mode: "no-cors",
      method: 'GET',
      headers: {
        // authorization: this._token
        authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
    .then(this._checkResponse)

  }

  createNewUser(name, email, password) {
    return fetch(`https://api.antiqueinvest.ru/signup`,{
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        name: name,
        email: email,
        password: password
      })
    })
      .then(responseCheck)
      .then((res) => {
        if(res.ok) {
          return res.json();
        }
        return Promise.reject(`Error: ${res.status}`);
      });  

  }


}


const mainApi = new MainApi({
  address: 'https://api.antiqueinvest.ru',
  token: `Bearer ${localStorage.getItem('token')}`
});
export default mainApi;
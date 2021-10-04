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


  delSavedCards(data) {
    return fetch(`${this._address}/cards/${data._id}`,{
      method: 'DELETE',
      headers: {
        authorization: this._token
      }
    })
    .then(this._checkResponse)
  }

  getSavedCards(data) {
    return fetch(`${this._address}/cards`,{
      method: 'GET',
      headers: {
        // authorization: this._token
        authorization: this._token
      }
    })
    .then(this._checkResponse)
  }

  postSavedCards(data) {
    return fetch(`${this._address}/cards`,{
      method: 'POST',
      headers: {
        // authorization: this._token,
        authorization: this._token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        country: data.country,
        director: data.director,
        duration: Number(data.duration),
        year: Number(data.year),
        description: data.description,
        image: "https://images.antiqueinvest.ru" + data.image.url,
        trailer: data.trailerLink,
        thumbnail: "https://images.antiqueinvest.ru" + data.image.formats.thumbnail.url,
        cardId: Number(data.id),
        nameRU: data.nameRU,
        nameEN: data.nameEN
      })
    })
  }

  getUserInfo(token) {
    return fetch(`${this._address}/users/me`,{
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


}


const mainApi = new MainApi({
  address: 'https://api.antiqueinvest.ru',
  token: `Bearer ${localStorage.getItem('token')}`
});
export default mainApi;
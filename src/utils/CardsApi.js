export class CardsApi {
    constructor({address, token}) {
      this._address = address;
      this._token = token;
    }

    _checkResponse(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка ${res.status}`);
    }

    getCards (data) {
        return fetch(`http://api.84.201.139.181:3000/`,{
          method: 'GET',
          headers: {
            // authorization: this._token
          }
        })
        .then(this._checkResponse)
      }
}

const cardsApi = new CardsApi({
    // address: 'https://api.zmovies.nomoredomains.icu/',
    address: 'http://api.84.201.139.181:3000/',
    token: `Bearer ${localStorage.getItem('token')}`
    // token: '2a94bf63-3818-4ae4-afdc-14a08472aae2'  
  });
  export default cardsApi;
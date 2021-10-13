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
        return fetch(`https://api.antiqueinvest.ru/cards`,{
          // mode: "no-cors",
          method: 'GET',
          headers: {
            authorization: `Bearer ${localStorage.getItem('token')}`
          }
        })
        .then(this._checkResponse)
      }

    //Меняем статус лота
    renewLotStatus (data, status, currentUserId) {
      return fetch(`https://api.antiqueinvest.ru/cards/renewStatus/${data._id}`,{
        // mode: "no-cors",
        method: 'PATCH',
        headers: {
          authorization: `Bearer ${localStorage.getItem('token')}`,
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          investorId: currentUserId,
          status: status
        })
      })
      .then(this._checkResponse)
    }
}

const cardsApi = new CardsApi({
    // address: 'https://api.zmovies.nomoredomains.icu/',
    address: 'https://api.antiqueinvest.ru/',
    token: `Bearer ${localStorage.getItem('token')}`
    // token: '2a94bf63-3818-4ae4-afdc-14a08472aae2'  
  });
  export default cardsApi;
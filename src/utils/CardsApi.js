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


    //Обновляем информацию о лоте
    renewAllDataOfLot ({
      lot_Id, 
      nameRU, 
      description,
      investPrice,
      sellPrice,
      revenueFromLot,
      statusOfLot,
      lotId,
    }) {
      return fetch(`https://api.antiqueinvest.ru/cards/renewAllData/${lot_Id}`,{
        // mode: "no-cors",
        method: 'PATCH',
        headers: {
          authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          nameRU: nameRU, 
          description: description,
          investPrice: Number(investPrice),
          sellPrice: Number(sellPrice),
          revenueFromLot: Number(revenueFromLot),
          status: statusOfLot,
          lotId: Number(lotId)
        })
      })
      .then(this._checkResponse)
    }

    getLotById(data) {
      return fetch(`https://api.antiqueinvest.ru/cards/${data}`,{
        method: 'GET',
        headers: {
          authorization: `Bearer ${localStorage.getItem('token')}`,
        }
      })
      .then(this._checkResponse)
    }

    postNewLot({
      nameRU, 
      description,
      image,
      investPrice,
      sellPrice,
      revenueFromLot,
      investorId,
      statusOfLot,
      lotId,
    }) {
      // return fetch(`${this._address}/cards`,{
      return fetch(`https://api.antiqueinvest.ru/cards`,{
        // mode: "no-cors",  
        method: 'POST',
        headers: {
          // authorization: this._token,
          authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          nameRU: nameRU,
          description: description,
          image: Array(image),
          investPrice: Number(investPrice),
          sellPrice: Number(sellPrice),
          revenueFromLot: Number(revenueFromLot),
          investorId: investorId,
          status: statusOfLot,
          lotId: Number(lotId),
        })
      })
    }


    //Меняем статус лота
    deleteLot (data) {
      return fetch(`https://api.antiqueinvest.ru/cards/${data}`,{
        method: 'DELETE',
        headers: {
          authorization: `Bearer ${localStorage.getItem('token')}`,
        }
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
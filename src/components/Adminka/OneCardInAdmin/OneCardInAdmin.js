import React from 'react';
import { useEffect, useState } from 'react';

import '../../Lots/LotsCard/movies-card/movies-card.css'

import './one-card-admin.css'

import cardsApi from '../../../utils/CardsApi';


import { CurrentUserContext } from '../../../contexts/CurrentUserContext';

const OneCardInAdmin = (item) => {

    console.log('после инициализации', Object.values(item)[0].nameRU, item.nameRU)
    // console.log(item)

    const initialLoginData = {
        lot_Id: Object.values(item)[0]._id,
        nameRU: Object.values(item)[0].nameRU,
        description: Object.values(item)[0].description,
        investPrice: Object.values(item)[0].investPrice,
        sellPrice: Object.values(item)[0].sellPrice,
        revenueFromLot: Object.values(item)[0].revenueFromLot,
        lotId: Object.values(item)[0].lotId,
        statusOfLot: Object.values(item)[0].status
    }

    const [data, setData] = useState(initialLoginData) 

    const [lot_Id, setLot_Id] = useState(Object.values(item)[0]._id)
    const [nameRU, setNameRU] = useState(Object.values(item)[0].nameRU)
    const [description, setDescription] = useState(Object.values(item)[0].description)
    const [investPrice, setInvestPrice] = useState(Object.values(item)[0].investPrice)
    const [sellPrice, setSellPrice] = useState(Object.values(item)[0].sellPrice)
    const [revenueFromLot, setRevenueFromLot] = useState(Object.values(item)[0].revenueFromLot)
    const [lotId, setLotID] = useState(Object.values(item)[0].lotId)
    const [statusOfLot, setStatusOfLot] = useState(Object.values(item)[0].status)


    


    const handleChange = (e) => {
            const { name, value } = e.target;
            setData(data => ({
            ...data,
            [name]:value
            })
        );
    }

    const nameRUHandler = (e) => {
        setNameRU(e.target.value)
        handleChange(e)
    }

    const descriptionHandler = (e) => {
        setDescription(e.target.value)
        handleChange(e)
    }

    const investPriceHandler = (e) => {
        setInvestPrice(+e.target.value)
        handleChange(e)
    }

    const sellPriceHandler = (e) => {
        setSellPrice(+e.target.value)
        handleChange(e)
    }

    const revenueFromLotHandler = (e) => {
        setRevenueFromLot(+e.target.value)
        handleChange(e)
    }

    const lotIDHandler = (e) => {
        setLotID(e.target.value)
        handleChange(e)
    }

    const statusOfLotHandler = (e) => {
        setStatusOfLot(e.target.value)
        handleChange(e)
    }




    function handlePatchAllChanges() {
        console.log(
            lot_Id, 
            nameRU, 
            description,
            investPrice,
            sellPrice,
            revenueFromLot,
            statusOfLot,
            lotId
        )

        cardsApi.renewAllDataOfLot({
            lot_Id, 
            nameRU, 
            description,
            investPrice,
            sellPrice,
            revenueFromLot,
            statusOfLot,
            lotId
        })
    }

    return (
            <div className="movies-card">

            <table>
                <caption className="movies-card__text">{lot_Id || ""}</caption>
                <tbody>
                    
                    <tr className="movies-card__text">
                        <th>Поле</th>
                        <th>Значение</th>
                    </tr>
                    <tr className="movies-card__text">
                        <td>Заголовок</td>
                        <td className="movies-card__text">
                            <input 
                                onChange = {e => nameRUHandler(e)} 
                                value={nameRU || ""}
                                // onBlur={e => blurHandler(e)} 
                                name = 'nameRU'                         
                                id = "nameRU" 
                                type="text"
                                className="one-card-admin__input" 
                                required placeholder = "Заголовок лота"
                            />                    
                        </td>
                    </tr>
                    <tr className="movies-card__text">
                        <td>Описание</td>
                        <td className="movies-card__text">
                            <input 
                                onChange = {e => descriptionHandler(e)} 
                                value={description || ""}
                                // onBlur={e => blurHandler(e)} 
                                name = 'description'                         
                                id = "description" 
                                type="text"
                                className="one-card-admin__input" 
                                required placeholder = "Описание лота"
                            />                    
                        </td>
                    </tr>
                    <tr className="movies-card__text">
                        <td>Фото</td>
                        <td>{Object.values(item)[0].image || ""}</td>
                    </tr>
                    <tr className="movies-card__text">
                        <td>Инвестцена</td>
                        <td className="movies-card__text">
                            <input 
                                onChange = {e => investPriceHandler(e)} 
                                value={investPrice || ""}
                                // onBlur={e => blurHandler(e)} 
                                name = 'investPrice'                         
                                id = "investPrice" 
                                type="number" 
                                className="one-card-admin__input" 
                                required placeholder = "Описание лота"
                            />                    
                        </td>
                    </tr>
                    <tr className="movies-card__text">
                        <td>Цена продажи</td>
                        <td className="movies-card__text">
                            <input 
                                onChange = {e => sellPriceHandler(e)} 
                                value={sellPrice || ""}
                                // onBlur={e => blurHandler(e)} 
                                name = 'sellPrice'                         
                                id = "sellPrice" 
                                type="number"  
                                className="one-card-admin__input" 
                                required placeholder = "Описание лота"
                            />                    
                        </td>
                    </tr>
                    <tr className="movies-card__text">
                        <td>Доход от лота</td>
                        <td className="movies-card__text">
                            <input 
                                onChange = {e => revenueFromLotHandler(e)} 
                                value={revenueFromLot || ""}
                                // onBlur={e => blurHandler(e)} 
                                name = 'revenueFromLot'                         
                                id = "revenueFromLot" 
                                type="number"  
                                className="one-card-admin__input" 
                                required placeholder = "Описание лота"
                            />                    
                        </td>
                    </tr>
                    <tr className="movies-card__text">
                    <td>Статус лота</td>
                    <td className="movies-card__text">
                            <input 
                                onChange = {e => statusOfLotHandler(e)} 
                                value={statusOfLot || ""}
                                // onBlur={e => blurHandler(e)} 
                                name = 'statusOfLot'                         
                                id = "statusOfLot" 
                                type="text"  
                                className="one-card-admin__input" 
                                required placeholder = "Описание лота"
                            />                    
                        </td>
                    </tr>
                    <tr className="movies-card__text">
                        <td>ID инвестора</td>
                        <td>{Object.values(item)[0].investorId || ""}</td>
                    </tr>
                    <tr className="movies-card__text">
                        <td>ID лота</td>
                        <td className="movies-card__text">
                            <input 
                                onChange = {e => lotIDHandler(e)} 
                                value={lotId || ""}
                                // onBlur={e => blurHandler(e)} 
                                name = 'lotId'                         
                                id = "lotId" 
                                type = "number"
                                className="one-card-admin__input" 
                                required placeholder = "Статус лота"
                            />                    
                        </td>
                    </tr>
                </tbody>
            </table>

            {
                // <div className="register__input-block">

                //     <h2 className="register__input-title">Пароль</h2>
                //     <input 
                //         onChange = {e => inputHandler(e)} 
                //         onBlur={e => blurHandler(e)} 
                //         value = {item.nameRU}
                //     />
                // </div>

            }     
            
            <button onClick = {handlePatchAllChanges} >Сохранить карточку</button>

            </div>
    )
};

export default OneCardInAdmin;

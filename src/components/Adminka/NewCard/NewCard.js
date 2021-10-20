import React from 'react';
import { useEffect, useState } from 'react';

import '../../Lots/LotsCard/movies-card/movies-card.css'

import '../OneCardInAdmin/one-card-admin.css'

import cardsApi from '../../../utils/CardsApi';


import { CurrentUserContext } from '../../../contexts/CurrentUserContext';

const NewCard = () => {

    const currentUser = React.useContext(CurrentUserContext);

    console.log('CurrentUserContext',currentUser._id)

    let investorId = currentUser._id

    const [data, setData] = useState('') 

    const [nameRU, setNameRU] = useState('')
    const [description, setDescription] = useState('')
    const [image, setImage] = useState(["https://images.antiqueinvest.ru/100002_1.JPG"])
    const [investPrice, setInvestPrice] = useState('')
    const [sellPrice, setSellPrice] = useState('')
    const [revenueFromLot, setRevenueFromLot] = useState('')
    const [lotId, setLotID] = useState('')
    const [statusOfLot, setStatusOfLot] = useState('')

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

    const imageHandler = (e) => {
        setImage(e.target.value)
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




    function handleCreateNewCard() {
        console.log(             
            nameRU, 
            description,
            image,
            investPrice,
            sellPrice,
            revenueFromLot,
            investorId,            
            statusOfLot,
            lotId
        )

        cardsApi.postNewLot({
            nameRU, 
            description,
            image,
            investPrice,
            sellPrice,
            revenueFromLot,
            investorId,            
            statusOfLot,
            lotId
        })
    }

    return (
            <div className="movies-card">

            <table>

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
                        <td className="movies-card__text">
                            <input 
                                onChange = {e => imageHandler(e)} 
                                value={image || "https://images.antiqueinvest.ru/100002_1.JPG"}
                                // onBlur={e => blurHandler(e)} 
                                name = 'image'                         
                                id = "image" 
                                type="text"
                                className="one-card-admin__input movies-card__text_type_image" 
                                required placeholder = "Описание лота"
                            />                    
                        </td>
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
                        <td>{investorId || ""}</td>
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
            
            <button onClick = {handleCreateNewCard} >Сохранить карточку</button>

            </div>
    )
};

export default NewCard;
import React from 'react';
import { useEffect, useState } from 'react';

import '../../Lots/LotsCard/movies-card/movies-card.css'


import { CurrentUserContext } from '../../../contexts/CurrentUserContext';

const TableInAdmin = (item) => {
    

    const [name, setName] = useState('')

    const handleChange = (e) => {
            const { name, value } = e.target;
            setData(data => ({
            ...data,
            [name]:value
            })
        );
    }

    const inputHandler = (e) => {
        setName(e.target.value)
        handleChange(e)
    }

    return (
            <div className="movies-card">

            <table>
                
                <caption className="movies-card__text">{item._id}</caption>
                <tbody>
                    <tr className="movies-card__text">
                        <th>Поле</th>
                        <th>Значение</th>
                    </tr>
                    <tr className="movies-card__text">
                        <td>Заголовок</td>
                        <td>{item.nameRU}</td>
                    </tr>
                    <tr className="movies-card__text">
                        <td>Описание</td>
                        <td>{item.description}</td>
                    </tr>
                    <tr className="movies-card__text">
                        <td>Фото</td>
                        <td>{item.image}</td>
                    </tr>
                    <tr className="movies-card__text">
                        <td>Инвестцена</td>
                        <td>{item.investPrice}</td>
                    </tr>
                    <tr className="movies-card__text">
                        <td>Цена продажи</td>
                        <td>{item.sellPrice}</td>
                    </tr>
                    <tr className="movies-card__text">
                        <td>Доход от лота</td>
                        <td>{item.revenueFromLot}</td>
                    </tr>
                    <tr className="movies-card__text">
                        <td>Статус</td>
                        <td>{item.status}</td>
                    </tr>
                    <tr className="movies-card__text">
                        <td>ID инвестора</td>
                        <td>{item.investorId}</td>
                    </tr>
                    <tr className="movies-card__text">
                        <td>ID лота</td>
                        <td>{item.lotId}</td>
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

            </div>
    )
};

export default TableInAdmin;

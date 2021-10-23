import React from 'react';
import { useEffect, useState } from 'react';

import SliderInCard from '../../Lots/SliderInCard/SliderInCard';

import '../../Lots/LotsCard/movies-card/movies-card.css'

import cardsApi from '../../../utils/CardsApi';


import { CurrentUserContext } from '../../../contexts/CurrentUserContext';




const SavedMoviesCard = ({handleButtonCancelInvest, onCardClick, ...item}) => {

    const currentUser = React.useContext(CurrentUserContext);
    const [numberOfPictureToShow, setNumberOfPictureToShow] = useState(0);
    const [isSavedMovies, setIsSavedMovies] = useState(false)

    // Проверяем есть ли картинка у фильма
    var urlMainPic = ''
    if (item.image === null) {
        urlMainPic = ''
    } else {urlMainPic = item.image}


    const handleTrailerLink = (url) => {
        window.open(url, '_blank', 'noopener,noreferrer')
    }


    //Отправляем фильм на сохранение
    function handleSaveSavedLots() {
        let status = "каталог"
        cardsApi.renewLotStatus(
            item,
            status,
            item.owner
        )
        .then(handleButtonCancelInvest)
        // handleRerenderSavedLotsAfterButton(reRenderSavedList)
        // console.log('LotsCard',reRenderSavedList)
    }

    //Меняем иконку на карточке фильма на иконку, что фильм сохранен    
    const savedMoviesSrc = () => {
        if (isSavedMovies) {return savedMovies} else {return notSavedMovies}
    }; 


    const handlePictureToShowPlus = () => {
        if (numberOfPictureToShow <  item.image.length-1) {
            setNumberOfPictureToShow(numberOfPictureToShow+1)
        } 
    }

    const handlePictureToShowMinus = () => {
        if (numberOfPictureToShow > 0) {
            setNumberOfPictureToShow(numberOfPictureToShow-1)
        }       
    }

    console.log('SavedMovies', item)

    return (
            <div className="movies-card">
                <div className="movies-card__picture-block">
                    <button onClick = {handlePictureToShowMinus}  className="movies-card__button">{'<'}</button>
                    <SliderInCard
                        images = {item.image}
                        numberOfPictureToShow = {numberOfPictureToShow}
                        onCardClick = {onCardClick}
                    />
                    <button onClick = {handlePictureToShowPlus}  className="movies-card__button">{'>'}</button>
                </div>
                <div className="movies-card__items">
                    <div className="movies-card__description">
                        <h2 className="movies-card__title">{item.nameRU}</h2>
                        <p className="movies-card__text">{item.description}</p>
                    </div>
                    <div className="movies-card__button-block">
                        <table>
                            <tbody>
                                <tr className="movies-card__text">
                                    <td>Инвестцена:</td>
                                    <td>{item.investPrice}</td>
                                </tr>
                                <tr className="movies-card__text">
                                    <td>Цена продажи:</td>
                                    <td>{item.sellPrice}</td>
                                </tr>
                                <tr className="movies-card__text">
                                    <td>Доход инвестора:</td>
                                    <td>{item.revenueFromLot}</td>
                                </tr>
                            </tbody>
                        </table>
                        {(item.status === 'отобранные') && <button onClick = {handleSaveSavedLots}  className="movies-card__button movies-card__button_type_long">Отказаться</button>}
                        {(item.status === 'в работе') && <button onClick = {handleSaveSavedLots}  disabled className="movies-card__button movies-card__button_type_long movies-card__button_type_in-work">В работе</button>}
                        {
                        // <button onClick = {handleSaveSavedLots}  className="movies-card__button movies-card__button_type_long">Отказаться</button>
                        }
                    </div>    
                </div>   
            </div>
    )
};

export default SavedMoviesCard;
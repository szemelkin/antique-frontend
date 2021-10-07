import React from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react';

import SliderInCard from '../SliderInCard/SliderInCard';

import './movies-card/movies-card.css'

import savedMovies from '../../../images/saved.svg'
import notSavedMovies from '../../../images/notsaved.svg'

import mainApi from '../../../utils/MainApi'
import cardsApi from '../../../utils/CardsApi';

import { CurrentUserContext } from '../../../contexts/CurrentUserContext';





function LotsCard({key, renderedLots, handleLotsRequest, onCardClick, ...item}) {

    console.log('LotsCard', renderedLots)
    console.log('LotsCard items', item)


    const currentUser = React.useContext(CurrentUserContext);

    const [numberOfPictureToShow, setNumberOfPictureToShow] = useState(0)

    // Проверяем есть ли картинка у фильма
    let urlMainPic = ''
    if (item.image === null) {
        urlMainPic = ''
    } else {urlMainPic = item.image}


    const handleTrailerLink = (url) => {
        window.open(url, '_blank', 'noopener,noreferrer')
    }

    const [isSavedMovies, setIsSavedMovies] = useState(false)

    //Отправляем фильм на сохранение
    function handleSaveLots() {

        console.log('handleRenewSaveLots', item._id, item)
        let status = "отобранные"
        cardsApi.renewLotStatus(
            item,
            status,
            currentUser._id
        )

        // mainApi.token = localStorage.getItem('token')
        // console.log('handleSaveLots',item)
        // mainApi.postSavedLots(item)
        // setIsSavedMovies(true)
        handleLotsRequest()
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
                    {
                    // <img className="movies-card__image" onClick = {() => handleTrailerLink(item.image.trailerLink)} src={urlMainPic} alt="Здесь должна быть картинка"/>
                    }
                </div>
                <div className="movies-card__items">
                    <div className="movies-card__description">
                        <h2 className="movies-card__title">{item.nameRU}</h2>
                        {
                        // <p className="movies-card__duration">{(Math.floor(props.duration/60)) + ' ч ' + (props.duration - (Math.floor(props.duration/60)*60))+ ' м'}</p>
                        }
                        <p className="movies-card__text">{item.description}</p>
                    </div>
                    <div className="movies-card__button-block">
                        <p className="movies-card__price">Инвест цена лота:</p>
                        <p className="movies-card__price">{item.investPrice}</p>
                        <button onClick = {handleSaveLots}  className="movies-card__button">Инвестировать</button>
                    </div>
                    
                </div>
                
            </div>

    )
};

export default LotsCard;
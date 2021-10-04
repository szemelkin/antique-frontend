import React from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react';

import './movies-card/movies-card.css'

import savedMovies from '../../../images/saved.svg'
import notSavedMovies from '../../../images/notsaved.svg'

import mainApi from '../../../utils/MainApi'

import { CurrentUserContext } from '../../../contexts/CurrentUserContext';

function MoviesCard(props) {


    const currentUser = React.useContext(CurrentUserContext);


    // Проверяем есть ли картинка у фильма
    let urlMainPic = ''
    if (props.image === null) {
        urlMainPic = ''
    } else {urlMainPic = props.image}


    const handleTrailerLink = (url) => {
        window.open(url, '_blank', 'noopener,noreferrer')
    }

    const [isSavedMovies, setIsSavedMovies] = useState(false)

    //Отправляем фильм на сохранение
    function handleSaveMovies() {
        mainApi.token = localStorage.getItem('token')
        mainApi.postSavedMovies(props)
        setIsSavedMovies(true)
    }

    //Меняем иконку на карточке фильма на иконку, что фильм сохранен
    
    const savedMoviesSrc = () => {
        if (isSavedMovies) {return savedMovies} else {return notSavedMovies}
    }; 
    
    console.log('picture',props.image)

    return (
        <div>
            <div className="movies-card">
                <div className="movies-card__items">
                    <div className="movies-card__description">
                        <h2 className="movies-card__title">{props.nameRU}</h2>
                        <p className="movies-card__duration">{(Math.floor(props.duration/60)) + ' ч ' + (props.duration - (Math.floor(props.duration/60)*60))+ ' м'}</p>
                    </div>
                    <button onClick = {handleSaveMovies}  className="movies-card__button"><img className="movies-card__icon" src={savedMoviesSrc()}  alt="Здесь должна быть картинка"/></button>
                </div>
                <img className="movies-card__image" onClick = {() => handleTrailerLink(props.image.trailerLink)} src={urlMainPic} alt="Здесь должна быть картинка"/>
            </div>
        </div>
    )
};

export default MoviesCard;
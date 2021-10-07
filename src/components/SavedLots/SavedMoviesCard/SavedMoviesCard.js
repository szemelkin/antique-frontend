import React from 'react';
import { useEffect, useState } from 'react';

import '../../Lots/LotsCard/movies-card/movies-card.css'
import moviesPicture from '../../../images/pic_1.svg'
import moviesIcon from '../../../images/delete_from_saved.svg'
import savedMovies from '../../../images/del_button.svg'

import mainApi from '../../../utils/MainApi'
import cardsApi from '../../../utils/CardsApi';
import SliderInCard from '../../Lots/SliderInCard/SliderInCard';

import { CurrentUserContext } from '../../../contexts/CurrentUserContext';

const SavedMoviesCard = ({key, renderedSavedLots, handleSavedLotsRequest, onCardClick, ...item}) => {

    const currentUser = React.useContext(CurrentUserContext);

    const [numberOfPictureToShow, setNumberOfPictureToShow] = useState(0);

    var urlMainPic = ''
    if (item.image === null) {
        urlMainPic = ''
    } else {urlMainPic = item.image}

    const handleTrailerLink = (url) => {
        window.open(url, '_blank', 'noopener,noreferrer')
    }

    function handleRenewSaveLots() {
        console.log('handleRenewSaveLots', item._id, item)
        let status = "каталог"
        cardsApi.renewLotStatus(
            item,
            status,
            item.owner
        )
        // handleSavedLotsRequest()
    }

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
                        <button onClick = {handleRenewSaveLots}  className="movies-card__button">Отказаться</button>
                    </div>    
                </div>   
            </div>

    )
};

export default SavedMoviesCard;
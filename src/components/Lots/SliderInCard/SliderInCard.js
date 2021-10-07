import React from 'react';
import { useEffect, useState } from 'react';

import { CurrentUserContext } from '../../../contexts/CurrentUserContext';

const SliderInCard = ({images, numberOfPictureToShow, onCardClick}) => {

    console.log('SliderInCard',numberOfPictureToShow)

    function handleClick() {
        onCardClick(images[numberOfPictureToShow])
    } 


    return (
            
            <img className="movies-card__image" onClick = {handleClick} src={images[numberOfPictureToShow]} alt="Здесь должна быть картинка"/>
        
    )

};

export default SliderInCard;
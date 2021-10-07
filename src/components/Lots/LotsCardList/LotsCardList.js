import React from 'react';
import { useEffect, useState } from 'react';

import './movies-card-list/movies-card-list.css'

import LotsCard from '../LotsCard/LotsCard'

import ImagePopup from '../../ImagePopup/ImagePopup';


const LotsCardList = ({nothingToShow, renderedLots, handleLotsRequest, onCardClick, arrayForRenderWithRespectToScreenToList}) => {

    const textInLotsCardList = 'Ничего не нашли, попробуйте поискать что-нибудь другое'
    
    console.log('LotsCardList', nothingToShow, renderedLots)

    const [isPhotoPopupOpen, setIsPhotoPopupOpen] = React.useState(false)
    const [selectedCard, setSelectedCard] = React.useState({})


    function handleCardClick(card) {
        setIsPhotoPopupOpen(true)
        setSelectedCard(card);
      }


    function closeAllPopups() {
    setIsPhotoPopupOpen(false)    
    }


    return (
        <section className="movies-card-list">
        {(nothingToShow) && <span className="search-form__text search-form__text_type_answer">{textInLotsCardList}</span>}

            {
                // props.arrayForRenderWithRespectToScreenToList.map(item => {
                renderedLots.map(item => {
                    return (            
                            <LotsCard 
                                key = {item.id}    
                                {...item}
                                renderedLots = {renderedLots}
                                handleLotsRequest = {handleLotsRequest}
                                onCardClick = {handleCardClick}
                            />)


                    })   

            }          
            
            <ImagePopup 
                card = {selectedCard}
                isOpen = {isPhotoPopupOpen}
                handleClick = {closeAllPopups}     
            />
        </section>
    )

};

export default LotsCardList;
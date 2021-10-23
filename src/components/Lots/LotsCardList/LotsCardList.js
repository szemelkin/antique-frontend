import React from 'react';
import { useEffect, useState } from 'react';

import './movies-card-list/movies-card-list.css'

import LotsCard from '../LotsCard/LotsCard'

import ImagePopup from '../../ImagePopup/ImagePopup';

import cardsApi from '../../../utils/CardsApi';

// import { CurrentUserContext } from '../../../contexts/CurrentUserContext';

const LotsCardList = ({nothingToShow, arrayForRenderWithRespectToScreenToList}) => {

    const textInLotsCardList = 'Ничего не нашли, попробуйте поискать что-нибудь другое'


    const [isPhotoPopupOpen, setIsPhotoPopupOpen] = React.useState(false)
    const [selectedCard, setSelectedCard] = React.useState({})
    const [renderedLots, setRenderedLots] = useState([])

    const [test, setTest] = useState(false)


    // Рендерим первый раз
    useEffect(() => {       
        handleLotsRequest();            
    }, []) 



    function handleButtonInvest() {
        handleLotsRequest();
        setTest(true);
    }



    function handleCardClick(card) {
        setIsPhotoPopupOpen(true)
        setSelectedCard(card);
    }

    function closeAllPopups() {
        setIsPhotoPopupOpen(false)    
    }


    function handleSetRenderedLots(renderedLots) {
        setRenderedLots(renderedLots)
    }

    //Достаем данные и сохраняем в локалсторидж
    const handleLotsRequest = () => {        
        cardsApi.getCards()
            .then(res => {
                let arrayForRenderByOwnId = []
                res.forEach(element => {
                    if (element.status === "каталог") {
                        arrayForRenderByOwnId.push(element)
                    }
                })
                handleSetRenderedLots(arrayForRenderByOwnId)
            })
            .catch((err) => {console.log(err)}); 
    }






    return (
        <section className="movies-card-list">
        {(nothingToShow) && <span className="search-form__text search-form__text_type_answer">{textInLotsCardList}</span>}

            {
                renderedLots.map((item,i) => {
                    return (            
                            <LotsCard 
                                key = {i} 
                                onCardClick = {handleCardClick}
                                // handleRerenderAfterButton = {handleRerenderAfterButton}
                                handleButtonInvest = {handleButtonInvest}                               
                                {...item}
                            />
                            )
                    }) 
            }          
            
            <ImagePopup 
                card = {selectedCard}
                handleClick = {closeAllPopups}     
            />
        </section>
    )

};

export default LotsCardList;
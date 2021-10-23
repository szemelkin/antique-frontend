import React, { useReducer } from 'react';
import { useEffect, useState } from 'react';

import cardsApi from '../../../utils/CardsApi';

import '../../Lots/LotsCardList/movies-card-list/movies-card-list.css'

import ImagePopup from '../../ImagePopup/ImagePopup';

import { CurrentUserContext } from '../../../contexts/CurrentUserContext';
import HeaderLots from '../../Lots/HeaderLots/HeaderLots';
import HistoryLotCard from '../HistoryLotCard/HistoryLotCard'

const HistoryLotsList = ({nothingToShowInSavedMoviesSearch}) => {

    const textInSavedMoviesCardList = 'Ничего не нашли, попробуйте поискать что-нибудь другое'
    const [isPhotoPopupOpen, setIsPhotoPopupOpen] = React.useState(false)
    const [selectedCard, setSelectedCard] = React.useState({})
    const [reRenderSavedList, setReRenderSavedList] = useState(true)
    const [renderedSavedLots, setRenderedSavedLots] = useState([])
    const [renderedHistoryLots, setRenderedHistoryLots] = useState([])

    const currentUser = React.useContext(CurrentUserContext);

    // Рендерим первый раз
    useEffect(() => {        
        handleHistoryLotsRequest()
        // handleSetRenderedLots(JSON.parse(localStorage.getItem('cards')))    
        // console.log('Lots Useeffect', JSON.parse(localStorage.getItem('cards')))
    }, []) 


    //Достаем данные и сохраняем в локалсторидж
    function handleHistoryLotsRequest() {

        cardsApi.getCards()
            .then(res => {
                let arrayForRenderByOwnId = []
                res.forEach(element => {
                    if (element.status === "реализованные") {
                        arrayForRenderByOwnId.push(element)
                    }
                })
                setRenderedHistoryLots(arrayForRenderByOwnId)
            })
            .catch((err) => {console.log(err)});        
    }

    

    //Рендер при заходе на страницу
    useEffect(() => {
        handleHistoryLotsRequest()
    }, []) 
    

    //Ререндерим при нажатии кнопки
    // useEffect(() =>{
    //     // console.log('Lots Useeffect', reRenderSavedList)
    //     handleSavedLotsRequest()
    // }, [reRenderSavedList])

    function handleButtonCancelInvest() {
        handleSavedLotsRequest();
    }




    function handleCardClick(card) {
        setIsPhotoPopupOpen(true)
        setSelectedCard(card);
    }


    function closeAllPopups() {
    setIsPhotoPopupOpen(false)    
    }


    function handleSetRenderedSavedLots(renderedSavedLots) {
        setRenderedSavedLots(renderedSavedLots)
    }

    function handleRerenderSavedLotsAfterButton(event) {
        setReRenderSavedList(event =>!event)   
        // console.log('Lots',reRenderSavedList)
    }



    return (
        <section className="movies-card-list">
            
        {(nothingToShowInSavedMoviesSearch) && <span className="search-form__text search-form__text_type_answer">{textInMoviesCardList}</span>}
            {                
                renderedHistoryLots.map((item,i) => {
                    return (
                            <HistoryLotCard 
                                key = {i}  
                                onCardClick = {handleCardClick}
                                {...item}
                            />
                            )
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

export default HistoryLotsList;
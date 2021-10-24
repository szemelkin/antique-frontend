import React, { useReducer } from 'react';
import { useEffect, useState } from 'react';

import cardsApi from '../../../utils/CardsApi';

import '../../Lots/LotsCardList/movies-card-list/movies-card-list.css'
import SavedMoviesCard from '../SavedMoviesCard/SavedMoviesCard'

import ImagePopup from '../../ImagePopup/ImagePopup';

import { CurrentUserContext } from '../../../contexts/CurrentUserContext';
import HeaderLots from '../../Lots/HeaderLots/HeaderLots';

const SavedMoviesCardList = ({nothingToShowInSavedMoviesSearch}) => {

    const textInSavedMoviesCardList = 'Ничего не нашли, попробуйте поискать что-нибудь другое'
    const [isPhotoPopupOpen, setIsPhotoPopupOpen] = React.useState(false)
    const [selectedCard, setSelectedCard] = React.useState({})
    const [reRenderSavedList, setReRenderSavedList] = useState(true)
    const [renderedSavedLots, setRenderedSavedLots] = useState([])

    const currentUser = React.useContext(CurrentUserContext);

    // Рендерим первый раз
    useEffect(() => {        
        handleSavedLotsRequest()
        // handleSetRenderedLots(JSON.parse(localStorage.getItem('cards')))    
        // console.log('Lots Useeffect', JSON.parse(localStorage.getItem('cards')))
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



    //Достаем данные и сохраняем в локалсторидж
    const handleSavedLotsRequest = () => {        
        cardsApi.getCards()
            .then(res => {
                // console.log(res)
                // localStorage.setItem('cards', JSON.stringify(res))
                let arrayForRenderByOwnId = []
                res.forEach(element => {
                    if (element.investorId === currentUser._id && element.status === "отобранные") {
                        arrayForRenderByOwnId.push(element)
                    }
                })
                handleSetRenderedSavedLots(arrayForRenderByOwnId)
            })
            .catch((err) => {console.log(err)}); 
    }


    return (
        <section className="movies-card-list">
            
        {(nothingToShowInSavedMoviesSearch) && <span className="search-form__text search-form__text_type_answer">{textInMoviesCardList}</span>}
            {                
                renderedSavedLots.map((item,i) => {
                    return (
                            <SavedMoviesCard 
                                key = {i}  
                                onCardClick = {handleCardClick}
                                handleButtonCancelInvest = {handleButtonCancelInvest} 
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

export default SavedMoviesCardList;
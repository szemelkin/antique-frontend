import React from 'react';
import { useEffect, useState } from 'react';

import './movies-card-list/movies-card-list.css'

import LotsCard from '../LotsCard/LotsCard'

import ImagePopup from '../../ImagePopup/ImagePopup';

import cardsApi from '../../../utils/CardsApi';


const LotsCardList = ({nothingToShow, arrayForRenderWithRespectToScreenToList}) => {

    const textInLotsCardList = 'Ничего не нашли, попробуйте поискать что-нибудь другое'


    const [isPhotoPopupOpen, setIsPhotoPopupOpen] = React.useState(false)
    const [selectedCard, setSelectedCard] = React.useState({})
    const [reRenderList, setReRenderList] = useState(true)
    const [renderedLots, setRenderedLots] = useState([])


    // Рендерим первый раз
    useEffect(() => {        

        let cleanupFunction = false;

        const fetchData = async () => {
            try {
                
            // handleSetRenderedLots(JSON.parse(localStorage.getItem('cards')))    
            // console.log('Lots Useeffect', JSON.parse(localStorage.getItem('cards')))
                if(!cleanupFunction) handleLotsRequest();
            } catch (e) {
                console.error(e.message)
            }
        }

        fetchData();
        
        return () => cleanupFunction = true;
    
    }, []) 

    //Ререндерим при нажатии кнопки
    useEffect(() =>{
        let cleanupFunction = false;
        // console.log('Lots Useeffect', reRenderList)
        handleLotsRequest()

        return () => cleanupFunction = true;
    }, [reRenderList])


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

    function handleRerenderAfterButton(event) {
        setReRenderList(event =>!event)   
        // console.log('Lots',reRenderList)
    }

    //Достаем данные и сохраняем в локалсторидж
    const handleLotsRequest = () => {        
        cardsApi.getCards()
            .then(res => {
                // console.log(res)
                // localStorage.setItem('cards', JSON.stringify(res))
                let arrayForRenderByOwnId = []
                res.forEach(element => {
                    if (element.investorId === element.owner) {
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
                                handleRerenderAfterButton = {handleRerenderAfterButton}
                                reRenderList = {reRenderList}                                
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

export default LotsCardList;
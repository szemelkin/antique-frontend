import React from 'react';
import { useEffect, useState } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom'

import '../Lots/movies.css'
import HistoryLotsList from './HistoryLotsList/HistoryLotsList'
import cardsApi from '../../utils/CardsApi';
import HeaderLots from '../Lots/HeaderLots/HeaderLots';
import UserGuide from '../Lots/UserGuide/UserGuide';

import { CurrentUserContext } from '../../contexts/CurrentUserContext';

const LotsHistory = (props) => {

    const [renderedHistoryLots, setRenderedHistoryLots] = useState([])

    const [nothingToShowInSavedLotsSearch, setNothingToShowInSavedLotsSearch] = useState(false)

    const currentUser = React.useContext(CurrentUserContext);



    //Запрос к базе фильмов и сохранение в массив
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

    
    return (
        <div className="movies">
            <HeaderLots />
            <UserGuide />
            <HistoryLotsList 
                renderedHistoryLots = {renderedHistoryLots}
                nothingToShowInSavedMoviesSearch = {nothingToShowInSavedLotsSearch}
            />
        </div>
    )

};

export default LotsHistory;
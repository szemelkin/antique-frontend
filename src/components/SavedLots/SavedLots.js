import React from 'react';
import { useEffect, useState } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom'

import '../Lots/movies.css'
import SavedMoviesCardList from './SavedMoviesCardList/SavedMoviesCardList'
import mainApi from '../../utils/MainApi'
import HeaderLots from '../Lots/HeaderLots/HeaderLots';
import UserGuide from '../Lots/UserGuide/UserGuide';

import { CurrentUserContext } from '../../contexts/CurrentUserContext';

const SavedMovies = (props) => {

    const [renderedSavedLots, setRenderedSavedLots] = useState([])

    const [nothingToShowInSavedLotsSearch, setNothingToShowInSavedLotsSearch] = useState(false)

    const currentUser = React.useContext(CurrentUserContext);

    //Запрос к базе фильмов и сохранение в массив
    function handleSavedLotsRequest() {

        mainApi.getSavedLots()
            .then(res => {
                let arrayForRenderByOwnId = []
                res.forEach(element => {
                    if (element.investorId === currentUser._id) {
                        arrayForRenderByOwnId.push(element)
                    }
                })
                setRenderedSavedLots(arrayForRenderByOwnId)
            })
            .catch((err) => {console.log(err)});        
    }



    //Рендер при заходе на страницу
    useEffect(() => {
        handleSavedLotsRequest()
    }, []) 

        //Ререндерим список карточек
    // useEffect(() =>{
    //     handleSavedLotsRequest()
    // }, [renderedSavedLots])


    //РеРендер после удаления карточки
    function handleRerenderAfterDel() {
        handleSavedLotsRequest()
    }
    
    return (
        <div className="movies">
            <HeaderLots />
            <UserGuide />
            <SavedMoviesCardList 
                renderedSavedLots = {renderedSavedLots}
                handleRerenderAfterDel = {handleRerenderAfterDel}
                handleSavedLotsRequest = {handleSavedLotsRequest}
                nothingToShowInSavedMoviesSearch = {nothingToShowInSavedLotsSearch}
            />
        </div>
    )

};

export default SavedMovies;
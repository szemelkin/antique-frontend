import React from 'react';
import { useEffect, useState } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom'

import '../Lots/movies.css'
import SearchFormSavedMovies from './SearchFormSavedMovies/SearchFormSavedMovies'
import SavedMoviesCardList from './SavedMoviesCardList/SavedMoviesCardList'
import FilterCheckBoxSavedMovies from './FilterCheckBoxSavedMovies/FilterCheckBoxSavedMovies'

import mainApi from '../../utils/MainApi'

import { CurrentUserContext } from '../../contexts/CurrentUserContext';

const SavedMovies = (props) => {

    const [renderedSavedLots, setRenderedSavedLots] = useState([])
    const [searchFraseSavedLots, setSearchFraseSavedLots] = useState('')


    const [nothingToShowInSavedLotsSearch, setNothingToShowInSavedLotsSearch] = useState(false)

    const currentUser = React.useContext(CurrentUserContext);
    console.log('SavedLots',currentUser)

    //Запрос к базе фильмов и сохранение в массив
    function handleSavedLotsRequest() {

        mainApi.getSavedLots()
            .then(res => {
                let arrayForRenderByOwnId = []
                res.forEach(element => {
                    console.log('element.owner', element.owner)
                    console.log('currentUser._id', currentUser._id)
                    if (element.investorId === currentUser._id) {
                        arrayForRenderByOwnId.push(element)
                    }
                })
                setRenderedSavedLots(arrayForRenderByOwnId)
                // console.log(res)
            })
            .catch((err) => {console.log(err)});        
    }



    //Рендер при заходе на страницу
    useEffect(() => {
        handleSavedLotsRequest()
        console.log('handleSaveLotsRequest',renderedSavedLots)
        console.log('CurrentUserContext',currentUser)

    }, []) 


    //РеРендер после удаления карточки
    function handleRerenderAfterDel() {
        handleSavedLotsRequest()
    }



    //Подгрузка слова из компонента Search

    const handleSearchFrase = (frase) => {
        setSearchFraseSavedLots(frase)
    }
    
    
    //Обработка поиска по фразе
    const handleSearchByFrase = (searchFraseSavedLots) => {

        setNothingToShowInSavedLotsSearch(true)
        if (!searchFraseSavedLots) {
            return;
        }

        let arraySavedLotsForRender = []


        const ru = /[а-яА-ЯЁё]/;
            if (ru.test(String(searchFraseSavedLots.search))) {
                renderedSavedLots.forEach(element => {
                    if (element.nameRU) {
                        if (element.nameRU.includes(searchFraseSavedLots.search)) {
                            arraySavedLotsForRender.push(element)
                        } else { }
                }
                setRenderedSavedLots(arraySavedLotsForRender)
                })
                // if (!arrayForRender || arrayForRender.length==0){setNothingToShowInSavedMoviesSearch(true)}
            } else {
                renderedSavedLots.forEach(element => {
                    if (element.nameEN) {
                        if (element.nameEN.includes(searchFraseSavedLots.search)) {
                            arraySavedLotsForRender.push(element)
                        } else { }
                }
                setRenderedSavedLots(arraySavedLotsForRender)    
                })
                // if (!arrayForRender || arrayForRender.length==0){setNothingToShowInSavedMoviesSearch(true)}
            }




        }
    
    //Обработка поиска по фразе и продолжительности
    const handleSearchByFraseAndDuration = (searchFraseSavedLots) => {

        setNothingToShowInSavedLotsSearch(true)
        console.log('Сюда приходим, чтобы найти только короткометражки', searchFraseSavedLots)
        // if (!searchFraseSavedMovies) {
        //     return;
        // }

        let arraySavedLotsForRender = []

        console.log('Сюда приходим, чтобы найти только короткометражки')
        const ru = /[а-яА-ЯЁё]/;

        if (searchFraseSavedLots) {
            console.log('searchFraseSavedLots',searchFraseSavedLots)
            // Случай, когда есть фраза в строке
            if (ru.test(String(searchFraseSavedLots.search))) {
                renderedSavedLots.forEach(element => {
                    if (element.nameRU) {
                        if (element.nameRU.includes(searchFraseSavedLots.search) && (element.duration < 40)) {
                            arraySavedLotsForRender.push(element)
                        } else { }
                }
                setRenderedSavedLots(arraySavedLotsForRender)
                })
                if (arrayForRender.length==0){setNothingToShowInSavedLotsSearch(true)}
            } else {
                renderedSavedLots.forEach(element => {
                    if (element.nameEN) {
                        if (element.nameEN.includes(searchFraseSavedLots.search) && (element.duration < 40)) {
                            arraySavedLotsForRender.push(element)
                        } else {}
                }
                setRenderedSavedLots(arraySavedLotsForRender)    
                })
                // if (!arrayForRender || arrayForRender.length==0){setNothingToShowInSavedMoviesSearch(true)}
            }
        } else {
            // Случай, когда нет фразы в строке
            console.log('searchFraseSavedLots Строка поиска пустая',searchFraseSavedLots)
            console.log('renderedSavedLots',renderedSavedLots)
            renderedSavedLots.forEach(element => {
            if ((element.duration < 40)) {
                arraySavedLotsForRender.push(element)
            }
            setRenderedSavedLots(arraySavedLotsForRender)    
            })    
            // if (!arrayForRender || arrayForRender.length==0){setNothingToShowInSavedMoviesSearch(true)}
        }
    }

    //Обработка нажатия на кнопку поиск
    const handleSearchButton = (e) => {
        
        e.preventDefault();
        if (!searchFraseSavedLots) {
            return;
        }
        handleSearchByFrase(searchFraseSavedLots)
        }


    //Обработка нажатия на тумблер
    const handleShortSavedLots = (checkBox) => {
        if (!checkBox) {
            console.log('Будем искать короткие', checkBox)
            handleSearchByFraseAndDuration(searchFraseSavedLots)
        } else {
            console.log('Пришли отменять короткие фильмыб ',searchFraseSavedLots)
            if (searchFraseSavedLots) {
                handleSavedLotsRequest()
                setSearchFraseSavedLots('')
            }
            else {
                handleSavedLotsRequest()
                setSearchFraseSavedLots('')
            }
        }
    }

    // useEffect(() => {
    //     handleShortSavedMovies
    // },[checkBox])


    return (
        <div className="movies">
            {
            // <SearchFormSavedMovies 
            //     handleSavedMoviesRequest = {handleSavedLotsRequest}
            //     handleSearchFrase = {handleSearchFrase}
            //     handleSearchButton = {handleSearchButton}
            // />
            }
            {
            // <FilterCheckBoxSavedMovies 
            //     handleShortSavedMovies = {handleShortSavedLots}
            // />
            }
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
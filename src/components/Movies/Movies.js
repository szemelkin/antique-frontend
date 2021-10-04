import React from 'react';
import { useEffect, useState } from 'react';

import './movies.css'
import SearchForm from '../Movies/SearchForm/SearchForm'
import MoviesCardList from '../Movies/MoviesCardList/MoviesCardList'
import FilterCheckBox from '../Movies/FilterCheckBox/FilterCheckBox'
import Continue from '../Movies/Continue/Continue'

import moviesApi from '../../utils/MoviesApi'

import { CurrentUserContext } from '../../contexts/CurrentUserContext';


const Movies = () => {

const currentUser = React.useContext(CurrentUserContext);
console.log('Movies',currentUser)

const [renderedMovies, setRenderedMovies] = useState([])
const [continueState, setContinueState] = useState(true)

const [searchFrase, setSearchFrase] = useState('')
const [nothingToShow, setNothingToShow] = useState(false)
const [isShowContinue, setIsShowContinue] = useState(true)

const [arrayForRenderWithRespectToScreenToList, setArrayForRenderWithRespectToScreenToList] = useState([])
const [firstRender, setFirstRender] = useState(0)

//Достаем данные и сохраняем в локалсторидж
const handleMoviesRequest = () => {
    moviesApi.getMovies()
        .then(res => {
            localStorage.setItem('movies', JSON.stringify(res))
        })
        .catch((err) => {console.log(err)});        
}

useEffect(() => {
    handleMoviesRequest()
}, []) 

const handleClickContinue = () => {
    setContinueState(!continueState)
}

const handleSearch = (el) => {
    setRenderedMovies(el)
}

const handleSearchFrase = (frase) => {
    setSearchFrase(frase)
}


const handleSearchButton = (e) => {

    e.preventDefault();
    if (!searchFrase) {
        return;
    }
    handleSearchByFrase(searchFrase)
}

const handleSearchByFrase = (searchFrase) => {
    setIsShowContinue(true)
    setNothingToShow(false)
    if (!searchFrase) {
        return;
    }
    let arrayMovies = JSON.parse(localStorage.getItem('movies'))
    let arrayForRender = []
    console.log('В поиске все норм пока')
    const ru = /[а-яА-ЯЁё]/;
    if (ru.test(String(searchFrase.search))) {
        arrayMovies.forEach(element => {
            if (element.nameRU) {
                if (element.nameRU.includes(searchFrase.search)) {
                    arrayForRender.push(element)
                } else { }
        }
        setRenderedMovies(arrayForRender)
        countCardsForRendering(arrayForRender)

        console.log('И массив в принципе собрали',arrayForRender)       
        
        })

        if (arrayForRender.length==0){setNothingToShow(true)}
        
    } else {
        arrayMovies.forEach(element => {
            if (element.nameEN) {
                if (element.nameEN.includes(searchFrase.search)) {
                    arrayForRender.push(element)
                } else { }
        }
        setRenderedMovies(arrayForRender)    
        })
        if (arrayForRender.length==0){setNothingToShow(true)}
    }
}

const handleSearchByFraseAndDuration = (searchFrase) => {
    setNothingToShow(false)
    setIsShowContinue(true)
    if (!searchFrase) {
        return;
    }

    let arrayMovies = JSON.parse(localStorage.getItem('movies'))
    let arrayForRender = []

    //---
    const ru = /[а-яА-ЯЁё]/;
    if (ru.test(String(searchFrase.search))) {
        arrayMovies.forEach(element => {
            if (element.nameRU) {
                if (element.nameRU.includes(searchFrase.search) && (element.duration < 40)) {
                    arrayForRender.push(element)
                } else { }
        }
        setRenderedMovies(arrayForRender)
        })
        if (arrayForRender.length==0){setNothingToShow(true)}
    } else {
        arrayMovies.forEach(element => {
            if (element.nameEN) {
                if (element.nameEN.includes(searchFrase.search) && (element.duration < 40)) {
                    arrayForRender.push(element)
                } else { }
        }
        setRenderedMovies(arrayForRender)    
        })
        if (arrayForRender.length==0){setNothingToShow(true)}
    }
}
    //---




//Постепенная выдача контента

//Самая первая итерация renderMovies еще не обновился

const countCardsForRendering = (arrayFoundedMovies) => {   
        let range = 3
        let countI = 0
        let arrayForRenderWithRespectToScreen = []
        let lengthArr = arrayForRenderWithRespectToScreenToList.length
        for (let i=0; i < lengthArr+range; i++) {
            arrayForRenderWithRespectToScreen.push(arrayFoundedMovies[i])
            countI = countI +1
        }
    setArrayForRenderWithRespectToScreenToList(arrayForRenderWithRespectToScreen)
    setFirstRender(countI)
}

//Самая первая итерация renderMovies еще не обновился


function countCardsForRendering2() {   
    let arrayForRenderWithRespectToScreen2 = []
    let i=0
    let range = 3
    let countI = 0
    if ((firstRender+range)<renderedMovies.length) {
        for (i; i < firstRender+range; i++) {
            arrayForRenderWithRespectToScreen2.push(renderedMovies[i])
            countI = countI +1
        }
        setFirstRender(countI)
    setArrayForRenderWithRespectToScreenToList(arrayForRenderWithRespectToScreen2)
    } else {
        setIsShowContinue(false)
        for (i; i < renderedMovies.length; i++) {
            arrayForRenderWithRespectToScreen2.push(renderedMovies[i])
            countI = countI +1
        }
        setFirstRender(countI)
        setArrayForRenderWithRespectToScreenToList(arrayForRenderWithRespectToScreen2)
    }
}


const handleShortMovies = (checkBox) => {
    if (!checkBox) {
        handleSearchByFraseAndDuration(searchFrase)
    } else {
        handleSearchByFrase(searchFrase)
    }
}

    return (
        <div className="movies">
            <SearchForm 
                handleMoviesRequest = {handleMoviesRequest}
                handleSearch = {handleSearch}
                handleSearchFrase = {handleSearchFrase}
                handleSearchButton = {handleSearchButton}
            />
            <FilterCheckBox 
                handleShortMovies = {handleShortMovies}
            />

            <MoviesCardList
                nothingToShow = {nothingToShow}
                renderedMovies = {renderedMovies}
                arrayForRenderWithRespectToScreenToList = {arrayForRenderWithRespectToScreenToList}     
            />
            {isShowContinue ?
            <Continue 
                handleClickContinue = {handleClickContinue}
                countCardsForRendering2 = {countCardsForRendering2}   
                isShowContinue = {isShowContinue}

            /> : null}
        </div>
    )

};

export default Movies;
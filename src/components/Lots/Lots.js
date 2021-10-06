import React from 'react';
import { useEffect, useState } from 'react';

import './movies.css'
import SearchForm from './SearchForm/SearchForm'
import MoviesCardList from './MoviesCardList/MoviesCardList'
import FilterCheckBox from './FilterCheckBox/FilterCheckBox'
import Continue from './Continue/Continue'

import cardsApi from '../../utils/CardsApi'

import { CurrentUserContext } from '../../contexts/CurrentUserContext';


const Lots = () => {

const currentUser = React.useContext(CurrentUserContext);
console.log('Lots',currentUser)

const [renderedLots, setRenderedLots] = useState([])
const [continueState, setContinueState] = useState(true)

const [searchFrase, setSearchFrase] = useState('')
const [nothingToShow, setNothingToShow] = useState(false)
const [isShowContinue, setIsShowContinue] = useState(true)

const [arrayForRenderWithRespectToScreenToList, setArrayForRenderWithRespectToScreenToList] = useState([])
const [firstRender, setFirstRender] = useState(0)

//Достаем данные и сохраняем в локалсторидж
const handleLotsRequest = () => {
    console.log('handleLotsRequest', 'Сработала загрузка при заходе на страницу')
    cardsApi.getCards()
        .then(res => {
            localStorage.setItem('cards', JSON.stringify(res))
            console.log('handleLotsRequest', res)
        })
        .catch((err) => {console.log(err)});        
}

useEffect(() => {
    console.log('handleLotsRequest', 'Сработала загрузка при заходе на страницу')
    handleLotsRequest()
    setRenderedLots(JSON.parse(localStorage.getItem('cards')))
    
}, []) 

const handleClickContinue = () => {
    setContinueState(!continueState)
}

const handleSearch = (el) => {
    setRenderedLots(el)
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
    let arrayMovies = JSON.parse(localStorage.getItem('cards'))
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
        setRenderedLots(arrayForRender)
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
        setRenderedLots(arrayForRender)    
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

    let arrayMovies = JSON.parse(localStorage.getItem('cards'))
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
        setRenderedLots(arrayForRender)
        })
        if (arrayForRender.length==0){setNothingToShow(true)}
    } else {
        arrayMovies.forEach(element => {
            if (element.nameEN) {
                if (element.nameEN.includes(searchFrase.search) && (element.duration < 40)) {
                    arrayForRender.push(element)
                } else { }
        }
        setRenderedLots(arrayForRender)    
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
    if ((firstRender+range)<renderedLots.length) {
        for (i; i < firstRender+range; i++) {
            arrayForRenderWithRespectToScreen2.push(renderedLots[i])
            countI = countI +1
        }
        setFirstRender(countI)
    setArrayForRenderWithRespectToScreenToList(arrayForRenderWithRespectToScreen2)
    } else {
        setIsShowContinue(false)
        for (i; i < renderedLots.length; i++) {
            arrayForRenderWithRespectToScreen2.push(renderedLots[i])
            countI = countI +1
        }
        setFirstRender(countI)
        setArrayForRenderWithRespectToScreenToList(arrayForRenderWithRespectToScreen2)
    }
}


const handleShortLots = (checkBox) => {
    if (!checkBox) {
        handleSearchByFraseAndDuration(searchFrase)
    } else {
        handleSearchByFrase(searchFrase)
    }
}

    return (
        <div className="movies">

            {
            // <SearchForm 
            //     handleMoviesRequest = {handleLotsRequest}
            //     handleSearch = {handleSearch}
            //     handleSearchFrase = {handleSearchFrase}
            //     handleSearchButton = {handleSearchButton}
            // />
            }
            {
            // <FilterCheckBox 
            //     handleShortMovies = {handleShortMovies}
            // />
        }

            <MoviesCardList
                nothingToShow = {nothingToShow}
                renderedLots = {renderedLots}
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

export default Lots;
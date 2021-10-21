import React from 'react';
import { useEffect, useState } from 'react';

import './movies.css'
import LotsCardList from './LotsCardList/LotsCardList'
import Continue from './Continue/Continue'
import HeaderLots from './HeaderLots/HeaderLots';
import UserGuide from './UserGuide/UserGuide';

import cardsApi from '../../utils/CardsApi'

import { CurrentUserContext } from '../../contexts/CurrentUserContext';

const Lots = () => {

const currentUser = React.useContext(CurrentUserContext);

const [continueState, setContinueState] = useState(true)
const [nothingToShow, setNothingToShow] = useState(false)
const [isShowContinue, setIsShowContinue] = useState(true)

const [arrayForRenderWithRespectToScreenToList, setArrayForRenderWithRespectToScreenToList] = useState([])
const [firstRender, setFirstRender] = useState(0)


//Обработчик кнопки "Еще"
const handleClickContinue = () => {
    setContinueState(!continueState)
}

//Постепенная выдача контента

//Самая первая итерация renderMovies еще не обновился
// const countCardsForRendering = (arrayFoundedMovies) => {   
//         let range = 3
//         let countI = 0
//         let arrayForRenderWithRespectToScreen = []
//         let lengthArr = arrayForRenderWithRespectToScreenToList.length
//         for (let i=0; i < lengthArr+range; i++) {
//             arrayForRenderWithRespectToScreen.push(arrayFoundedMovies[i])
//             countI = countI +1
//         }
//     setArrayForRenderWithRespectToScreenToList(arrayForRenderWithRespectToScreen)
//     setFirstRender(countI)
// }

//Самая первая итерация renderMovies еще не обновился
// function countCardsForRendering2() {   
//     let arrayForRenderWithRespectToScreen2 = []
//     let i=0
//     let range = 3
//     let countI = 0
//     if ((firstRender+range)<renderedLots.length) {
//         for (i; i < firstRender+range; i++) {
//             arrayForRenderWithRespectToScreen2.push(renderedLots[i])
//             countI = countI +1
//         }
//         setFirstRender(countI)
//     setArrayForRenderWithRespectToScreenToList(arrayForRenderWithRespectToScreen2)
//     } else {
//         setIsShowContinue(false)
//         for (i; i < renderedLots.length; i++) {
//             arrayForRenderWithRespectToScreen2.push(renderedLots[i])
//             countI = countI +1
//         }
//         setFirstRender(countI)
//         setArrayForRenderWithRespectToScreenToList(arrayForRenderWithRespectToScreen2)
//     }
// }


    return (
        <div className="movies">
            <HeaderLots />
            <UserGuide />
            <LotsCardList
                nothingToShow = {nothingToShow}
                arrayForRenderWithRespectToScreenToList = {arrayForRenderWithRespectToScreenToList}   
            />
            {
            // {isShowContinue ?
                
            // <Continue 
            //     handleClickContinue = {handleClickContinue}
            //     countCardsForRendering2 = {countCardsForRendering2}   
            //     isShowContinue = {isShowContinue}
            // /> : null}
            }
        </div>
    )
};

export default Lots;
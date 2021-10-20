import React from 'react';
import { useEffect, useState } from 'react';




import { CurrentUserContext } from '../../../contexts/CurrentUserContext';

const LeftBlock = () => {

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

const handleRequestAllCards = () => {
    
}


function handleSaveLots() {
    let status = "отобранные"
    cardsApi.renewLotStatus(
        item,
        status,
        currentUser._id
    )
    .then(handleButtonInvest)
}



    return (
        <div className="adminka_left-block">
            <h1>Меню</h1>
            <button onClick = {handleRequestAllCards}>Выгрузить все карточки</button>

        </div>
    )
};

export default LeftBlock;



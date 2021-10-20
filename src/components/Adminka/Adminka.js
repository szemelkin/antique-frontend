import React from 'react';
import { useEffect, useState } from 'react';
import './adminka.css'




import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import LeftBlock from './LeftBlock/LeftBlock';
import RightBlock from './RightBlock/RightBlock';

const Adminka = () => {

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
        <div className="adminka">
            <LeftBlock />
            <RightBlock />

        </div>
    )
};

export default Adminka;
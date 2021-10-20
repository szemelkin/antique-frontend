import React from 'react';
import { useEffect, useState } from 'react';




import { CurrentUserContext } from '../../../contexts/CurrentUserContext';

import cardsApi from '../../../utils/CardsApi';
import mainApi from '../../../utils/MainApi';
import LotsCard from '../../Lots/LotsCard/LotsCard';
import OneCardInAdmin from '../OneCardInAdmin/OneCardInAdmin'
import TableInAdmin from '../TableInAdmin/TableInAdmin'
import NewCard from '../NewCard/NewCard'
import TableAllUsers from '../TableAllUsers/TableAllUsers';
import CreateNewUser from  '../CreateNewUser/CreateNewUser'

let chooseAction =''

const RightBlock = () => {

const currentUser = React.useContext(CurrentUserContext);

const [allCards, setAllCards] = useState([])
const [oneCard, setOneCard] = useState([])
const [allUsers, setAllUsers] = useState([])

const [chooseRequestAllCards, setChooseRequestAllCards] = useState(false)
const [chooseRequestOneCards, setChooseRequestOneCards] = useState(false)
const [chooseRequestNewCards, setChooseRequestNewCards] = useState(false)
const [chooseDeleteCards, setChooseDeleteCards] = useState(false)
const [chooseRequestAllUsers, setChooseRequestAllUsers] = useState(false)
const [chooseRequestCreateNewUser, setChooseRequestCreateNewUser] = useState(false)

const [data, setData] = useState('') 
const [cardIdForRequest, setCardIdForRequest] = useState('')
const [cardIdForDelete, setCardIdForDelete] = useState('')

// const [arrayForRenderWithRespectToScreenToList, setArrayForRenderWithRespectToScreenToList] = useState([])
// const [firstRender, setFirstRender] = useState(0)


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


function handleRequestAllCards() {
    setChooseRequestAllCards(true)
    setChooseRequestOneCards(false)
    setChooseRequestNewCards(false)
    setChooseDeleteCards(false)
    setChooseRequestAllUsers(false)
    setChooseRequestCreateNewUser(false)

    console.log('handleRequestAllCards',chooseRequestAllCards, chooseRequestOneCards)
    cardsApi.getCards()
    .then(res => {
        setAllCards(res)
        console.log('handleRequestAllCards',res, chooseAction )
    })
    .catch((err) => {console.log(err)}); 


}

let cardIdForGet = '615e0cf8c99fc53a407921cd'

const handleRequestCardById = () => {

    cardsApi.getLotById(cardIdForRequest)
    .then(res => {
        setOneCard(res)
        console.log('handleRequestCardById',res, chooseAction )
    
    }).then(res => {
        setChooseRequestAllCards(false)
        setChooseRequestOneCards(true)
        setChooseRequestNewCards(false)
        setChooseDeleteCards(false)
        setChooseRequestAllUsers(false)
        setChooseRequestCreateNewUser(false)
    }
    )
    .catch((err) => {console.log(err)}); 
}

//Хендлер выгрузки всех пользователей
const handleRequestAllUsers = () => {
    setChooseRequestAllCards(false)
    setChooseRequestOneCards(false)
    setChooseRequestNewCards(false)
    setChooseDeleteCards(false)
    setChooseRequestAllUsers(true)
    setChooseRequestCreateNewUser(false)

    mainApi.getAllUsers()
        .then(res => {
            setAllUsers(res)
    })
    .catch((err) => {console.log(err)}); 



}


function handleDeleteCard() {
    setChooseRequestAllCards(false)
    setChooseRequestOneCards(false)
    setChooseRequestNewCards(false)
    setChooseDeleteCards(true)
    setChooseRequestAllUsers(false)
    setChooseRequestCreateNewUser(false)
    
    cardsApi.deleteLot(cardIdForDelete)
    .catch((err) => {console.log(err)}); 

}

function handlePostNewCard() {
    setChooseRequestAllCards(false)
    setChooseRequestOneCards(false)
    setChooseRequestNewCards(true)
    setChooseDeleteCards(false)

}


function handleCreateNewUser() {
    setChooseRequestAllCards(false)
    setChooseRequestOneCards(false)
    setChooseRequestNewCards(false)
    setChooseDeleteCards(false)
    setChooseRequestAllUsers(false)
    setChooseRequestCreateNewUser(true)

console.log(
    chooseRequestAllCards, 
    chooseRequestOneCards, 
    chooseRequestNewCards, 
    chooseDeleteCards, 
    chooseRequestAllUsers, 
    chooseRequestCreateNewUser
)
}



const handleChange = (e) => {
    const { name, value } = e.target;
    setData(data => ({
    ...data,
    [name]:value
    })
);
}

const cardIdForRequestHandler = (e) => {
    setCardIdForRequest(e.target.value)
    handleChange(e)
}

const cardIdForDeleteHandler = (e) => {
    setCardIdForDelete(e.target.value)
    handleChange(e)
}










    return (
        <section>
            <div className="adminka_right-block">
                <h1>Меню</h1>
                <button onClick = {handleRequestAllCards}>Выгрузить все карточки</button>
                <button onClick = {handleRequestCardById}>Выгрузить карточку по id
   
                </button>
                <input 
                    onChange = {e => cardIdForRequestHandler(e)} 
                    value={ cardIdForRequest || ""}
                    // onBlur={e => blurHandler(e)} 
                    name = 'cardIdForRequest'                         
                    id = "cardIdForRequest" 
                    type="text"
                    className="one-card-admin__input" 
                    required placeholder = "Id запрашиваемой карточки"
                />  
                <button onClick = {handlePostNewCard}>Создать новую карточку</button>
                <button onClick = {handleDeleteCard}>Удалить карточку</button>
                <button onClick = {handleCreateNewUser}>Создать нового пользователя</button>
                <input 
                    onChange = {e => cardIdForDeleteHandler(e)} 
                    value={ cardIdForDelete || ""}
                    // onBlur={e => blurHandler(e)} 
                    name = 'cardIdForDelete'                         
                    id = "cardIdForDelete" 
                    type="text"
                    className="one-card-admin__input" 
                    required placeholder = "Id удаляемой карточки"
                />  
                <button onClick = {handleRequestAllUsers}>Выгрузить всех пользователей</button>

            </div>

            {(chooseRequestAllCards && !chooseRequestOneCards && !chooseRequestNewCards && !chooseRequestAllUsers && !chooseRequestCreateNewUser) && 
                <div>
                    {
                        allCards.map((item,i) => {
                            return (            
                                    <TableInAdmin 
                                        key = {i} 
                                        {...item}
                                    />
                                    )
                            })             
                    }
                </div>
            }

            {(!chooseRequestAllCards && !chooseRequestOneCards && !chooseRequestNewCards && chooseRequestAllUsers && !chooseRequestCreateNewUser) && 
                <div>
                    {
                        allUsers.map((item,i) => {
                            return (            
                                    <TableAllUsers 
                                        key = {i} 
                                        {...item}
                                    />
                                    )
                            })             
                    }
                </div>
            }


            
            {(!chooseRequestAllCards && chooseRequestOneCards && !chooseRequestNewCards && !chooseRequestAllUsers && !chooseRequestCreateNewUser) && 
                <div>
                    <OneCardInAdmin 
                        item = {oneCard}
                    />
                </div>
            }

            {(!chooseRequestAllCards && !chooseRequestOneCards && chooseRequestNewCards && !chooseRequestAllUsers && !chooseRequestCreateNewUser) && 
                <div>
                    <NewCard 
                    />
                </div>
            }

            
            {(!chooseRequestAllCards && !chooseRequestOneCards && !chooseRequestNewCards && !chooseRequestAllUsers && chooseRequestCreateNewUser) && 
                <div>
                    <CreateNewUser 
                    />
                </div>
            }

 




        </section>


    )
};

export default RightBlock;
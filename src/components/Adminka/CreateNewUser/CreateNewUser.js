import React from 'react';
import { useEffect, useState } from 'react';

import '../../Lots/LotsCard/movies-card/movies-card.css'

import '../OneCardInAdmin/one-card-admin.css'

import mainApi from '../../../utils/MainApi';


import { CurrentUserContext } from '../../../contexts/CurrentUserContext';

const CreateNewUser = () => {

    const currentUser = React.useContext(CurrentUserContext);

    console.log('CurrentUserContext',currentUser._id)

    let investorId = currentUser._id

    const [data, setData] = useState('') 

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleChange = (e) => {
            const { name, value } = e.target;
            setData(data => ({
            ...data,
            [name]:value
            })
        );
    }

    const nameHandler = (e) => {
        setName(e.target.value)
        handleChange(e)
    }

    const emailHandler = (e) => {
        setEmail(e.target.value)
        handleChange(e)
    }

    const passwordHandler = (e) => {
        setPassword(e.target.value)
        handleChange(e)
    }


    function handleCreateNewUser() {
        console.log(             
            typeof name, 
            typeof email,
            typeof password
        )


        mainApi.createNewUser(
            name,
            email,
            password
        )
    }

    return (
            <div className="movies-card">

            <table>

                <tbody>
                    
                    <tr className="movies-card__text">
                        <th>Имя</th>
                        <th>Емейл</th>
                        <th>Пароль</th>
                    </tr>
                    <tr className="movies-card__text">
                        <td>Имя</td>
                        <td className="movies-card__text">
                            <input 
                                onChange = {e => nameHandler(e)} 
                                value={name || ""}
                                name = 'name'                         
                                id = "name" 
                                type="text"
                                className="one-card-admin__input" 
                                required placeholder = "Имя"
                            />                    
                        </td>
                    </tr>
                    <tr className="movies-card__text">
                        <td>Емейл</td>
                        <td className="movies-card__text">
                            <input 
                                onChange = {e => emailHandler(e)} 
                                value={email || ""}
                                name = 'емейл'                         
                                id = "емейл" 
                                type="email"
                                className="one-card-admin__input" 
                                required placeholder = "Емейл"
                            />                    
                        </td>
                    </tr>
                    <tr className="movies-card__text">
                        <td>Пароль</td>
                        <td className="movies-card__text">
                            <input 
                                onChange = {e => passwordHandler(e)} 
                                value={password || ""}
                                name = 'password'                         
                                id = "password" 
                                type="text"
                                className="one-card-admin__input" 
                                required placeholder = "Пароль"
                            />                    
                        </td>
                    </tr>

                </tbody>
            </table>
            
            <button onClick = {handleCreateNewUser} >Создать пользователя</button>

            </div>
    )
};

export default CreateNewUser;
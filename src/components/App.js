import React from 'react';
import { useEffect, useState } from 'react';
import { Route, Switch, useHistory} from 'react-router-dom';

import Header from '../components/Header/Header';
import Main from '../components/Main/Main';
import Lots from './Lots/Lots';
import Footer from '../components/Footer/Footer';
import Profile from '../components/Profile/Profile';
import Register from '../components/Register/Register';
import Login from '../components/Login/Login';
import SavedLots from './SavedLots/SavedLots';
import Errors from '../components/Errors/Errors';
import Preloader from './Lots/Preloader/Preloader';
import ProtectedRoute from './ProtectedRoute';

import mainApi from '../utils/MainApi'
import cardsApi from '../utils/CardsApi';

import * as auth from '../utils/auth';

import { CurrentUserContext } from '../contexts/CurrentUserContext';

function App() {
    
    const [showPreLoader, setShowPreLoader] = useState(false)
    const [renderedLots, setRenderedLots] = useState([])

    const [loggedIn, setLoggedIn] = useState(false);
    const history = useHistory();

    const [currentUser, setCurrentUser] = React.useState({
        name: '', 
        email: ''
        })

    console.log('App',currentUser)
                

    const initialData = {
        name: '',
        email: '',
        };    

    const testData = {
        name: '',
        email: '',
        };    

    const handleRequest = () => {
        setShowPreLoader(true)
        let  token  = localStorage.getItem('token')
        mainApi.getUserInfo(token)
            .then(res => {
                console.log('handleRequest',res)
                setCurrentUser(res)
                
            })
            .catch((err) => {console.log(err)})  
            .finally(setShowPreLoader(false))
        }


    const handleLotsRequest = () => {
        cardsApi.getCards()
        .then(res => {
            console.log('handleLotsRequest',res)
            let arrayForRenderByOwnId = []
            res.forEach(element => {
                console.log('element.investorId', element.investorId)
                console.log('element.owner', element.owner)
                if (element.investorId === element.owner) {
                    arrayForRenderByOwnId.push(element)
                }
            })
            setRenderedLots(arrayForRenderByOwnId)
            // console.log(res)
        })
        .catch((err) => {console.log(err)}); 
    
    
        // console.log('handleLotsRequest', 'Сработала загрузка при заходе на страницу')
        // cardsApi.getCards()
        //     .then(res => {
        //         localStorage.setItem('cards', JSON.stringify(res))
        //         console.log('handleLotsRequest', res)
        //     })
        //     .catch((err) => {console.log(err)});        
    }
        
    useEffect(() => {
        handleRequest()
        handleLotsRequest()
        setCurrentUser(testData)
        console.log('useEffect handleRequest',currentUser)
    }, []);

    function handleSignOut() {
        // Удаляем токен из локального хранилища при логауте
        localStorage.removeItem('token');
        localStorage.removeItem('lots');
        // Возвращаем пользовательские данные к начальному состоянию
        setCurrentUser(initialData);
        setLoggedIn(false);
        // Перенаправляем пользователя на страницу логина
        history.push('/');
    }


    const handleRegister = ({name, email, password}) => {
        setShowPreLoader(true)
        return auth.register(name, email, password)
        .then(res => {
            if (!res || res.statusCode === 400) {
                new Error('Что-то пошло не так!');            
            }
            if (res) {
                // localStorage.setItem('token')
            return res;
            }
        })
        .catch((err)=>{
            console.log(`Ошибка при загрузке данных пользователя: ${err}`)
        })
        .finally(setShowPreLoader(false))
    
    }

    const handleRenewUser = (data) => {
        setShowPreLoader(true)
        return mainApi.renewUserInfo(data)
        .then(res => {
            if (!res || res.statusCode === 400) {
                new Error('Что-то пошло не так!');            
            }
            if (res) {
                console.log('renewUserContextAfterPatching Пошли обновлять контекст')
                renewUserContextAfterPatching()
                // setCurrentUser(res)
            return res;
            
            }
        })
        .catch((err)=>{
            console.log(`Ошибка при загрузке данных пользователя: ${err}`)
        })
        .finally(setShowPreLoader(false))
    
    }

    function renewUserContextAfterPatching() {
        let token = localStorage.getItem('token');
        console.log(token)
        mainApi.getUserInfo(token)
            .then(res => {
            setCurrentUser(res)    
            console.log('renewUserContextAfterPatching',res)
            console.log('NewUserContext App', currentUser)              
        })
        .catch((err) => {console.log(err)});
        
    }


    const handleLogin = ({ email, password }) => {
        setShowPreLoader(true)
        return auth.authorize(email, password)
        .then(res => {
            if (!res || res.statusCode === 400) throw new Error('Что-то пошло не так');
                if (res.token) {      
                    setLoggedIn(true);                
                    localStorage.setItem('token', res.token);
                    console.log('Даже на handleLogin зашли вот с таким токеном', res.token)
                    mainApi.getUserInfo(res.token)
                        .then(res => {
                        console.log('handleRequest',res)
                        setCurrentUser(res)
                    
                    })
                    .catch((err) => {console.log(err)});  
        
            }
            })
            
            .then(() => history.push('/lots'))
            .finally(setShowPreLoader(false))
        }    


    return (
        <CurrentUserContext.Provider value={currentUser}>
            <div>
                <div className="page">
                    <Header handleRequest = {handleRequest}/>
                        
                        <Switch>
                            
                                <Route exact path path = "/">
                                    <Main />
                                </Route>
                                <ProtectedRoute path = "/lots"
                                    component = {Lots}
                                    loggedIn = {loggedIn} 
                                    showPreLoader = {showPreLoader}
                                    renderedLots = {renderedLots}
                                >
                                </ProtectedRoute>
                                <ProtectedRoute path = "/saved-lots"
                                    component = {SavedLots}
                                    loggedIn = {loggedIn} 
                                >
                                </ProtectedRoute>
                                <ProtectedRoute path = "/profile"
                                    component = {Profile}
                                    loggedIn = {loggedIn} 
                                    showPreLoader = {showPreLoader}
                                    handleRequest = {handleRequest}
                                    handleSignOut = {handleSignOut}
                                    handleRenewUser = {handleRenewUser}
                                    renewUserContextAfterPatching = {renewUserContextAfterPatching}
                                >
                                </ProtectedRoute>
                            

                            <Route path = "/signin">
                                <Login 
                                    onLogin = {handleLogin}
                                    showPreLoader = {showPreLoader}
                                    // tokenCheck = {tokenCheck}
                                />
                            </Route>
                            <Route path = "/signup">
                                <Register 
                                    onRegister={handleRegister} 
                                    showPreLoader = {showPreLoader}
                                />
                            </Route>
                            

                        </Switch>
                    <Footer />
                </div>
            </div>
        </CurrentUserContext.Provider>
    )
}

export default App;


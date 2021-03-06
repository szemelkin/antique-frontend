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
import Adminka from './Adminka/Adminka';

import mainApi from '../utils/MainApi'
import cardsApi from '../utils/CardsApi';

import * as auth from '../utils/auth';

import { CurrentUserContext } from '../contexts/CurrentUserContext';
import LotsHistory from './LotsHistory/LotsHistory';

function App() {

    console.log('CurrentUserContext', CurrentUserContext)
    
    const [showPreLoader, setShowPreLoader] = useState(false)
  

    const [loggedIn, setLoggedIn] = useState(false);
    const history = useHistory();

    const [currentUser, setCurrentUser] = React.useState({
        name: '', 
        email: ''
        })

                


    const initialData = {
        name: '',
        email: '',
        };    

    const handleRequest = () => {
        setShowPreLoader(true)
        let  token  = localStorage.getItem('token')
        mainApi.getUserInfo(token)
            .then(res => {
                // console.log('handleRequest',res)
                setCurrentUser(res)
                
            })
            .catch((err) => {console.log(err)})  
            .finally(setShowPreLoader(false))
        }


    const handleLotsRequest = () => {
        // cardsApi.getCards()
        // .then(res => {
        //     let arrayForRenderByOwnId = []
        //     res.forEach(element => {
        //         if (element.investorId === element.owner) {
        //             arrayForRenderByOwnId.push(element)
        //         }
        //     })
        //     setRenderedLots(arrayForRenderByOwnId)
        // })
        // .catch((err) => {console.log(err)}); 
    
    
        // console.log('handleLotsRequest', '?????????????????? ???????????????? ?????? ???????????? ???? ????????????????')
        cardsApi.getCards()
            .then(res => {
                localStorage.setItem('cards', JSON.stringify(res))
                let arrayForRenderByOwnId = []
                res.forEach(element => {
                    if (element.investorId === element.owner) {
                        arrayForRenderByOwnId.push(element)
                    }
                })
                setRenderedLots(arrayForRenderByOwnId)
                // console.log('handleLotsRequest', res)
            })
            .catch((err) => {console.log(err)});        
    }
        
    useEffect(() => {
        handleRequest()
        // handleLotsRequest()
        setCurrentUser(initialData)
        // console.log('useEffect handleRequest',currentUser)

        //???????????????? ?????? ????????????????????????, ???????? ???????????????????????? ??????????????????????????????
        // let token = localStorage.getItem('token');
        // mainApi.getUserInfo(token).then( res => {
        //     if (res.statusCode === 200) {
        //         setLoggedIn(true)
        //     }
        //     console.log('checkLoginned', res)
        // }
        // );

    }, []);

    function handleSignOut() {
        // ?????????????? ?????????? ???? ???????????????????? ?????????????????? ?????? ??????????????
        localStorage.removeItem('token');
        localStorage.removeItem('lots');
        // ???????????????????? ???????????????????????????????? ???????????? ?? ???????????????????? ??????????????????
        setCurrentUser(initialData);
        setLoggedIn(false);
        // ???????????????????????????? ???????????????????????? ???? ???????????????? ????????????
        history.push('/');
    }


    const handleRegister = ({name, email, password}) => {
        setShowPreLoader(true)
        return auth.register(name, email, password)
        .then(res => {
            if (!res || res.statusCode === 400) {
                new Error('??????-???? ?????????? ???? ??????!');            
            }
            if (res) {
                // localStorage.setItem('token')
            return res;
            }
        })
        .catch((err)=>{
            console.log(`???????????? ?????? ???????????????? ???????????? ????????????????????????: ${err}`)
        })
        .finally(setShowPreLoader(false))
    
    }

    const handleRenewUser = (data) => {
        setShowPreLoader(true)
        return mainApi.renewUserInfo(data)
        .then(res => {
            if (!res || res.statusCode === 400) {
                new Error('??????-???? ?????????? ???? ??????!');            
            }
            if (res) {
                // console.log('renewUserContextAfterPatching ?????????? ?????????????????? ????????????????')
                renewUserContextAfterPatching()
                // setCurrentUser(res)
            return res;
            
            }
        })
        .catch((err)=>{
            console.log(`???????????? ?????? ???????????????? ???????????? ????????????????????????: ${err}`)
        })
        .finally(setShowPreLoader(false))
    
    }

    function renewUserContextAfterPatching() {
        let token = localStorage.getItem('token');
        // console.log(token)
        mainApi.getUserInfo(token)
            .then(res => {
            setCurrentUser(res)    
            // console.log('renewUserContextAfterPatching',res)
            // console.log('NewUserContext App', currentUser)              
        })
        .catch((err) => {console.log(err)});
        
    }


    const handleLogin = ({ email, password }) => {
        setShowPreLoader(true)
        return auth.authorize(email, password)
        .then(res => {
            if (!res || res.statusCode === 400) throw new Error('??????-???? ?????????? ???? ??????');
                if (res.token) {      
                    setLoggedIn(true);                
                    localStorage.setItem('token', res.token);
                    // console.log('???????? ???? handleLogin ?????????? ?????? ?? ?????????? ??????????????', res.token)
                    mainApi.getUserInfo(res.token)
                        .then(res => {
                        // console.log('handleRequest',res)
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
                                    // renderedLots = {renderedLots}
                                    // handleSetRenderedLots = {handleSetRenderedLots}                                    
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

                                <ProtectedRoute path = "/adminka"
                                    component = {Adminka}
                                    loggedIn = {true}
                                >
                                </ProtectedRoute>

                                <ProtectedRoute path = "/history"
                                    component = {LotsHistory}
                                    loggedIn = {true}
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


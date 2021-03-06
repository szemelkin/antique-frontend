import React from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom'
import reactLogo from '../../images/logo.svg';
import profileLink from '../../images/profile.svg';
import burgerMenu from '../../images/burger_menu_max.svg';
import crossButton from '../../images/close_cross.svg';
import './header/header.css'

import { CurrentUserContext } from '../../contexts/CurrentUserContext';

const handleBurger = (e) => {
    document.getElementById("surprise").classList.toggle('header__invisible')
    document.getElementById("burgerButton").classList.toggle('header__invisible')
    document.getElementById("crossButton").classList.toggle('header__invisible')
    document.getElementById("surprise1").classList.toggle('header__invisible')
    document.getElementById("surprise2").classList.toggle('header__invisible')
    document.getElementById("surprise3").classList.toggle('header__invisible')
    document.getElementById("surprise4").classList.toggle('header__invisible')
    document.getElementById("surprise5").classList.toggle('header__invisible')
    document.getElementById("surprise6").classList.toggle('header__invisible')

}

const handleCrossButton = (e) => {
    document.getElementById("surprise").classList.toggle('header__invisible')
    document.getElementById("burgerButton").classList.toggle('header__invisible')
    document.getElementById("crossButton").classList.toggle('header__invisible')
    document.getElementById("surprise1").classList.toggle('header__invisible')
    document.getElementById("surprise2").classList.toggle('header__invisible')
    document.getElementById("surprise3").classList.toggle('header__invisible')
    document.getElementById("surprise4").classList.toggle('header__invisible')
    document.getElementById("surprise5").classList.toggle('header__invisible')
    document.getElementById("surprise6").classList.toggle('header__invisible')

}


const Header = (props) => {

    const location = useLocation();

    const signin = 
        <div>
            <header className="header">
                <p className="header__logo" src={reactLogo} alt="?????????????? ??????????"></p>
                <div className="header__menu">
                    {
                    // <Link to="signup" className="header__link" href="/signup">??????????????????????</Link>
                    }
                    <Link to="signin" className="header__button" href="/signin">??????????</Link>
                </div>
            </header>
        </div>
        
    const logined = 
        <div>
            <header className="header">
                <p className="header__logo" src={reactLogo} alt="?????????????? ??????????"></p>
                <div className="header__menu">
                    <Link to="history" className="header__link header__link_type_hidden" href="/history">?????????????? ????????????</Link>
                    <Link to="lots" className="header__link header__link_type_hidden" href="/lots">???????? ?????? ????????????????????????????</Link>
                    <Link to="saved-lots" className="header__link header__link_type_hidden" href="/saved-lots">?????????????????? ???????? ????????</Link>
                    <Link to="profile" className="header__link header__link_type_hidden" href="/profile"><img className="header__profileLink" src={profileLink} alt="?????????????? ??????????"/></Link>
                    <button id='burgerButton' onClick = {(e) => handleBurger()} className="header__burger-button"><img className="header__burger" src={burgerMenu}/></button>  
                    <button id='crossButton' onClick = {(e) => handleCrossButton()} className="header__burger-button header__burger-button_type_black header__invisible"><img className="header__burger" src={crossButton}/></button>                  
                    <div id='surprise' className="header__burger-menu header__invisible">
                        <div id='surprise1' className="header__burger-menu-links-left header__invisible"></div>  
                        <div id='surprise2' className="header__burger-menu-links header__invisible">           
                            <Link to="history" id='surprise3' className="header__link_type_burger header__invisible" href="/history">?????????????? ????????????</Link>          
                            <Link to="lots" id='surprise4' className="header__link_type_burger header__invisible" href="/Lots">???????? ?????? ????????????????????????????</Link>
                            <Link to="saved-lots" id='surprise5' className="header__link_type_burger header__invisible" href="/saved-lots">???????????????????????????????????? ????????</Link>
                            <Link onClick = {props.handleRequest} to="profile" id='surprise6' className="header__link_type_burger header__invisible" href="/profile"><img className="header__profileLink" src={profileLink} alt="?????????????? ??????????"/></Link>
                        </div>  
                    </div>
                </div>
            </header>
        </div>

    const adminka = 
    <div>
        <header className="header">
            <p className="header__logo" src={reactLogo} alt="?????????????? ??????????"></p>
            <div className="header__menu">            
                <Link to="history" className="header__link header__link_type_hidden" href="/history">?????????????? ????????????</Link>
                <Link to="lots" className="header__link header__link_type_hidden" href="/lots">???????? ?????? ????????????????????????????</Link>
                <Link to="saved-lots" className="header__link header__link_type_hidden" href="/saved-lots">?????????????????? ???????? ????????</Link>
                <Link to="profile" className="header__link header__link_type_hidden" href="/profile"><img className="header__profileLink" src={profileLink} alt="?????????????? ??????????"/></Link>
                <button id='burgerButton' onClick = {(e) => handleBurger()} className="header__burger-button"><img className="header__burger" src={burgerMenu}/></button>  
                <button id='crossButton' onClick = {(e) => handleCrossButton()} className="header__burger-button header__burger-button_type_black header__invisible"><img className="header__burger" src={crossButton}/></button>                  
                <div id='surprise' className="header__burger-menu header__invisible">
                    <div id='surprise1' className="header__burger-menu-links-left header__invisible"></div>  
                    <div id='surprise2' className="header__burger-menu-links header__invisible">           
                        <Link to="history" id='surprise3' className="header__link_type_burger header__invisible" href="/history">?????????????? ????????????</Link>          
                        <Link to="lots" id='surprise4' className="header__link_type_burger header__invisible" href="/Lots">???????? ?????? ????????????????????????????</Link>
                        <Link to="saved-lots" id='surprise5' className="header__link_type_burger header__invisible" href="/saved-lots">???????????????????????????????????? ????????</Link>
                        <Link onClick = {props.handleRequest} to="profile" id='surprise6' className="header__link_type_burger header__invisible" href="/profile"><img className="header__profileLink" src={profileLink} alt="?????????????? ??????????"/></Link>
                    </div>  
                </div>
            </div>
        </header>
    </div>
    
    const signing = 
        <div>
        </div>

    const currentUrl = location.pathname

    const menuNavigation = (currentUrl) => {
        if (currentUrl == "/") {return signin}
        else if (currentUrl == '/lots') {return logined}
        else if (currentUrl == '/saved-lots') {return logined}
        else if (currentUrl == '/profile') {return logined}
        else if (currentUrl == '/signin') {return signing}
        else if (currentUrl == '/adminka') {return adminka}
        else if (currentUrl == '/history') {return logined}
    }

    return (
        <div>
            {
                menuNavigation(currentUrl)                
            }
        </div>
    )

};

export default Header;
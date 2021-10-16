import React from 'react';
import { useLocation } from 'react-router-dom'

import './header-lots.css'


function HeaderLots() {

    const location = useLocation();

    const textInTitle = (currentUrl) => {
        if (currentUrl == "/lots") {return 'Лоты для инвестирования'}
        else if (currentUrl == '/saved-lots') {return 'Выбранные вами лоты'}
    }
    

    return (


        <h1 className = 'header-lots_title'>{textInTitle(location.pathname)}</h1>

    )
    
};
export default HeaderLots;
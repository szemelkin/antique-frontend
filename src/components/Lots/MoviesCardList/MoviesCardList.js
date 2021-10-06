import React from 'react';
import { useEffect, useState } from 'react';

import './movies-card-list/movies-card-list.css'
import LotsCard from '../LotsCard/LotsCard'


const LotsCardList = (props) => {

    const textInLotsCardList = 'Ничего не нашли, попробуйте поискать что-нибудь другое'
    
    return (
        <section className="movies-card-list">
        {(props.nothingToShow) && <span className="search-form__text search-form__text_type_answer">{textInLotsCardList}</span>}

            {
                // props.arrayForRenderWithRespectToScreenToList.map(item => {
                props.renderedLots.map(item => {
                    return (            
                            <LotsCard 
                                key = {item.id}    
                                {...item}

                            />)
                    })   

            }          
            
        </section>
    )

};

export default LotsCardList;
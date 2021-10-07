import React from 'react';
import '../../Lots/LotsCardList/movies-card-list/movies-card-list.css'
import SavedMoviesCard from '../SavedMoviesCard/SavedMoviesCard'
import moviesIcon from '../../../images/del_button.svg'
import moviesIconBlack from '../../../images/black_flag.svg'

const SavedMoviesCardList = ({renderedSavedLots,handleSavedLotsRequest, handleRerenderAfterDel,nothingToShowInSavedMoviesSearch}) => {

    const textInSavedMoviesCardList = 'Ничего не нашли, попробуйте поискать что-нибудь другое'
    const [isPhotoPopupOpen, setIsPhotoPopupOpen] = React.useState(false)
    const [selectedCard, setSelectedCard] = React.useState({})


    function handleCardClick(card) {
        setIsPhotoPopupOpen(true)
        setSelectedCard(card);
      }


    function closeAllPopups() {
    setIsPhotoPopupOpen(false)    
    }

    return (
        <section className="movies-card-list">
        {(nothingToShowInSavedMoviesSearch) && <span className="search-form__text search-form__text_type_answer">{textInMoviesCardList}</span>}
            {                
                renderedSavedLots.map(item => {
                    return (<SavedMoviesCard 
                            key = {item.id}    
                            {...item}
                            renderedSavedLots = {renderedSavedLots}
                            handleSavedLotsRequest = {handleSavedLotsRequest}
                            onCardClick = {handleCardClick}
                            />)
                    })      
            }                      
        </section>
    )

};

export default SavedMoviesCardList;
import React from 'react';

import '../ImagePopup/modal.css'

function ImagePopup(props) {

    return (
        <section className={`modal modal_type_image ${props.isOpen ? 'modal_is-open': ''}`}>
            <div className="modal__container-image">
                <button className="modal__close-button" onClick = {props.handleClick}> </button>
                <img className="modal__image" src={`${props.card}`} alt="Здесь должна быть картинка" />
                {
                // <h3 className="modal__title-image">{props.card}</h3>
                }
            </div>
        </section>
    )

};

export default ImagePopup;
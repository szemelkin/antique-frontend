import React from 'react';
import './continue/continue.css'

const Continue = (props) => {


    const handleContinueButton = () => {
        console.log(props)
        props.countCardsForRendering2()
    }

    return (
        <div className="continue">
            <button className="continue__button" onClick = {handleContinueButton}>
                <p className="continue__text">Ещё</p>
            </button>
        </div>
    )

};

export default Continue;
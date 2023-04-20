import React from 'react';

function ImagePopup({ card, onClose }) {
    return (
        <div className={`popup popup-img ${card.link ? 'popup_opened' : ''}`}>
            <div className="popup-img__container">
                <button aria-label="Закрыть" type="button" className="popup__close" onClick={onClose}></button>
                <img className="popup-img__image" src={card.link} alt={card.name} />
                <h2 className="popup-img__title">{card.name}</h2>
            </div>
        </div>
    )
}

export default ImagePopup;
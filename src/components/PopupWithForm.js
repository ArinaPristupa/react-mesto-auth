import React from 'react';

function PopupWithForm({ name, title, children, buttonText, isOpen, onClose, onSubmit }) {
    return (
        <div className={`popup popup_type_${name} ${isOpen ? 'popup_opened' : ''}`}>
            <div className="popup__container">
                <h3 className='popup__title'>{title}</h3>
                <form name={name} className="popup__form" onSubmit={onSubmit}>
                    {children}
                    <button type="submit" className="popup__button">{buttonText || 'Сохранить'}</button>
                </form>
                <button aria-label="Закрыть" type="button" className="popup__close" onClick={onClose}></button>
            </div>
        </div>
    )
}

export default PopupWithForm;
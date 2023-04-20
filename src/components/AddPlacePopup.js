import React, { useState, useEffect } from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup({ isOpen, onClose, onAddPlace, isLoading }) {

    const [name, setName] = useState('');
    const [link, setLink] = useState('');

    useEffect(() => {
        setName('');
        setLink('');
    }, [isOpen]);

    function handleSubmit(e) {
        // Запрещаем браузеру переходить по адресу формы
        e.preventDefault();

        // Передаём значения управляемых компонентов во внешний обработчик
        onAddPlace({
            name: name,
            link: link,
        });
    }

    function handleChangeAddPlaceName(e) {
        setName(e.target.value)
    }

    function handleChangeAddPlaceLink(e) {
        setLink(e.target.value)
    }

    return (
        <PopupWithForm
            name='card'
            title='Новое место'
            buttonText={isLoading ? 'Cоздание...' : 'Создать'}
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
        >
            <input
                type="text"
                name="name"
                id="user-title"
                placeholder="Название"
                className="popup__text popup__text_type_title color"
                minLength="2"
                maxLength="30"
                required
                onChange={handleChangeAddPlaceName}
                value={name}
            />
            <span className="user-title-error popup__input-error"></span>
            <input
                type="url"
                name="link"
                id="user-link"
                placeholder="Ссылка на картинку"
                className="popup__text  popup__text_type_img-link color"
                required
                onChange={handleChangeAddPlaceLink}
                value={link}
            />
            <span className="user-link-error popup__input-error"></span>
        </PopupWithForm>
    )
}

export default AddPlacePopup;
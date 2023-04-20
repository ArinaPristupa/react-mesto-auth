import React, { useState, useEffect } from 'react';
import CurrentUserContext from '../contexts/CurrentUserContext';
import PopupWithForm from './PopupWithForm';

function EditProfilePopup({ isOpen, onClose, onUpdateUser, isLoading }) {

    const currentUser = React.useContext(CurrentUserContext);

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
    }, [currentUser, isOpen]);

    function handleSubmit(e) {
        // Запрещаем браузеру переходить по адресу формы
        e.preventDefault();

        // Передаём значения управляемых компонентов во внешний обработчик
        onUpdateUser({
            name: name,
            about: description,
        });
    }

    function handleChangeName(e) {
        setName(e.target.value)
    }

    function handleChangeDescription(e) {
        setDescription(e.target.value)
    }

    return (
        <PopupWithForm
            name='profile'
            title='Редактировать профиль'
            buttonText={isLoading ? 'Сохранение...' : 'Сохранить'}
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
        >
            <input
                type="text"
                name="name"
                id="user-name"
                placeholder="Имя"
                className="popup__text popup__text_type_name color"
                minLength="2"
                maxLength="40"
                required
                onChange={handleChangeName}
                value={name || ''}
            />
            <span className="user-name-error popup__input-error"></span>
            <input
                type="text"
                name="about"
                id="user-hobby"
                placeholder="О себе"
                className="popup__text  popup__text_type_hobby color"
                minLength="2"
                maxLength="200"
                required
                onChange={handleChangeDescription}
                value={description || ''}
            />
            <span className="user-hobby-error popup__input-error"></span>

        </PopupWithForm>
    )
}

export default EditProfilePopup;
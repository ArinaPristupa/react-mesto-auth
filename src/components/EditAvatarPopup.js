import React, { useEffect } from 'react';
import PopupWithForm from './PopupWithForm';

function EditProfilePopup({ isOpen, onClose, onUpdateAvatar, isLoading }) {

    const avatarRef = React.useRef(null)

    useEffect(() => {
        avatarRef.current.value = ''
    }, [isOpen])

    function handleSubmit(e) {
        e.preventDefault();

        onUpdateAvatar({
            avatar: avatarRef.current.value
        });
    }

    return (
        <PopupWithForm
            name='avatar'
            title='Обновить аватар'
            buttonText={isLoading ? 'Сохранение...' : 'Сохранить'}
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
        >
            <input
                type="url"
                name="avatar"
                id="user-avatar"
                placeholder="https://somewebsite.com/someimage.jpg"
                className="popup__text  popup__text_type_popup-avatar"
                required
                ref={avatarRef}
            />
            <span className="user-avatar-error popup__input-error"></span>
        </PopupWithForm>
    )
}

export default EditProfilePopup;
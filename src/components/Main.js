import React from 'react';
import CurrentUserContext from '../contexts/CurrentUserContext';
import Card from './Card';

function Main({ onEditAvatar, onEditProfile, onAddPlace, onCardClick, cards, onCardLike, onCardDelete }) {

    const user = React.useContext(CurrentUserContext);

    return (

        <main className="content">
            <section className="profile">

                <button aria-label="Редактировать аватар" type="button" className="profile__avatar-button" onClick={() => { onEditAvatar(true) }}>
                    <img className="profile__avatar" src={user.avatar} alt="Мужчина на фоне моря в очках и красной шапке." />
                </button>

                <div className="profile__info">
                    <div className="profile__info-blok">
                        <h1 className="profile__title">{user.name}</h1>
                        <button aria-label="Редактировать профиль" type="button" className="profile__img-pen" onClick={() => { onEditProfile(true) }} />
                    </div>
                    <p className="profile__subtitle">{user.about}</p>
                </div>

                <button aria-label="Добавить что-то новое" type="button" className="profile__add-button" onClick={() => { onAddPlace(true) }} />
            </section>

            <section className="elements" >
                {cards.map((card) => (
                    <Card
                        card={card}
                        key={card._id}
                        likes={card.likes}
                        onCardDelete={onCardDelete}
                        onCardClick={onCardClick}
                        onCardLike={onCardLike}
                    />
                ))}
            </section>

        </main>
    )
}

export default Main;
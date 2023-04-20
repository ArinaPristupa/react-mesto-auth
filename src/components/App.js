import React, { useEffect, useState } from 'react';
import { Route, Routes, Navigate, useNavigate } from "react-router-dom";
import { loginUse, registerUser, getToken } from '../utils/auth';
import '../index.css';
import api from '../utils/Api';
import CurrentUserContext from '../contexts/CurrentUserContext';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import AddPlacePopup from './AddPlacePopup';
import EditAvatarPopup from './EditAvatarPopup';
import Login from './Login';
import Register from './Register';
import InfoTooItip from './InfoTooItip';
import ProtectedRoute from './ProtectedRoute';
import okRegister from '../images/ok.svg'
import noRegister from '../images/no.svg'



function App() {

    const [currentUser, setCurrentUser] = useState({});

    const [isEditProfilePopupOpen, setisEditProfilePopupOpen] = useState(false);
    const [isAddPlacePopupOpen, setisAddPlacePopupOpen] = useState(false);
    const [isEditAvatarPopupOpen, setisEditAvatarPopupOpen] = useState(false);
    const [isInfoToolTipPopupOpen, setisInfoToolTipPopupOpen] = useState(false);

    const [isInfoToolTipData, setisInfoToolTipData] = useState({
        title: '',
        image: ''
    });

    const [selectedCard, setselectedCard] = useState({});
    const [cards, setCards] = useState([]);

    const [isLoading, setIsLoading] = useState(false);

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [email, setEmail] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        if (isLoggedIn)
            api.getInformationUser()
                .then((profileData) => {
                    setCurrentUser(profileData)
                })
                .catch((err) => {
                    console.log(err); // выведем ошибку в консоль
                });
        if (isLoggedIn)
            api.getInitialCards()
                .then((cardData) => {
                    setCards(cardData.map((data) => ({
                        _id: data._id,
                        name: data.name,
                        link: data.link,
                        likes: data.likes,
                        owner: data.owner
                    })))
                })
                .catch((err) => {
                    console.log(err); // выведем ошибку в консоль
                });
    }, [isLoggedIn])

    const isOpen = isEditAvatarPopupOpen || isEditProfilePopupOpen || isAddPlacePopupOpen || selectedCard.link || isInfoToolTipPopupOpen

    useEffect(() => {
        function closeByEscape(evt) {
            if (evt.key === 'Escape') {
                closeAllPopups();
            }
        }
        if (isOpen) { // навешиваем только при открытии
            document.addEventListener('keydown', closeByEscape);
            return () => {
                document.removeEventListener('keydown', closeByEscape);
            }
        }
    }, [isOpen])

    function closeAllPopups() {
        setisEditProfilePopupOpen(false)
        setisAddPlacePopupOpen(false)
        setisEditAvatarPopupOpen(false)
        setisInfoToolTipPopupOpen(false)
        setselectedCard({})
    }

    function handleCardLike(card) {
        // Снова проверяем, есть ли уже лайк на этой карточке
        const isLiked = card.likes.some(data => data._id === currentUser._id);

        // Отправляем запрос в API и получаем обновлённые данные карточки
        api.likeCard(card._id, !isLiked)
            .then(newCard =>
                setCards((state) => state.map((item) => item._id === card._id ? newCard : item))
            )
            .catch((err) => {
                console.log(err); // выведем ошибку в консоль
            });
    }

    function handleCardDelete(card) {
        api.deleteCard(card._id)
            .then(() => {
                setCards((state) => state.filter((item) => item._id !== card._id));
            })
            .catch((err) => {
                console.log(err); // выведем ошибку в консоль
            });
    }

    function handleUpdateUser(data) {
        setIsLoading(true);
        api.getEditedDataProfile(data)
            .then((newData) => {
                setCurrentUser(newData);
                closeAllPopups();
            })
            .catch((err) => {
                console.log(err); // выведем ошибку в консоль
            })
            .finally(() => setIsLoading(false))
    }

    function handleUpdateAvatar(data) {
        setIsLoading(true);
        api.updateAvatarUser(data)
            .then((newData) => {
                setCurrentUser(newData);
                closeAllPopups();
            })
            .catch((err) => {
                console.log(err); // выведем ошибку в консоль
            })
            .finally(() => setIsLoading(false))
    }

    function handleAddPlaceSubmit(data) {
        setIsLoading(true);
        api.addNewCard(data)
            .then((cardElement) => {
                setCards([cardElement, ...cards])
                closeAllPopups();
            })
            .catch((err) => {
                console.log(err); // выведем ошибку в консоль
            })
            .finally(() => setIsLoading(false))
    }

    function register(email, password) {
        registerUser(email, password)
            .then(() => {
                setisInfoToolTipData({
                    title: 'Вы успешно зарегистрировались!',
                    image: okRegister
                })
                navigate('/sign-in')
            })
            .catch(() => {
                setisInfoToolTipData({
                    title: 'Что-то пошло не так! Попробуйте ещё раз.',
                    image: noRegister
                })
            })
            .finally(setisInfoToolTipPopupOpen(true))
    }

    function login(email, password) {
        loginUse(email, password)
            .then((res) => {
                localStorage.setItem('jwt', res.token);
                setIsLoggedIn(true)
                setEmail(email)
                navigate('/')
            })
            .catch(() => {
                setisInfoToolTipData({
                    title: 'Что-то пошло не так! Попробуйте ещё раз.',
                    image: noRegister
                })
                setisInfoToolTipPopupOpen(true)
            })
    }

    useEffect(() => {
        const jwt = localStorage.getItem('jwt');

        if (jwt) {
            getToken(jwt)
                .then(res => {
                    setIsLoggedIn(true);
                    setEmail(res.data.email);
                })
                .catch(err => {
                    if (err.status === 401) {
                        console.log('401 — Токен не передан или передан не в том формате');
                    }
                    console.log('401 — Переданный токен некорректен');
                });
        }
    }, []);

    useEffect(() => {
        if (isLoggedIn === true) {
            navigate('/')
        }
    }, [isLoggedIn, navigate]);


    function singOut() {
        localStorage.removeItem('jwt')
        setIsLoggedIn(false)
        setEmail(null)
        navigate('/sign-in')
    }

    return (
        <CurrentUserContext.Provider value={currentUser}>
            <div className="page">

                <Routes>
                    <Route
                        path='/sign-in'
                        element={
                            <>
                                <Header
                                    title='Регистрация'
                                    route='/sign-up' />
                                <Login
                                    handleLogin={login}
                                />
                            </>
                        }
                    />
                    <Route
                        path='/sign-up'
                        element={
                            <>
                                <Header
                                    title='Войти'
                                    route='/sign-in' />
                                <Register
                                    handleRegister={register}
                                />
                            </>
                        }
                    />

                    <Route
                        exact
                        path='/'
                        element={
                            <>
                                <Header
                                    title='Выйти'
                                    route=''
                                    email={email}
                                    onClick={singOut}
                                />
                                <ProtectedRoute
                                    component={Main}
                                    isloggedIn={isLoggedIn}
                                    onEditProfile={setisEditProfilePopupOpen}
                                    onEditAvatar={setisEditAvatarPopupOpen}
                                    onAddPlace={setisAddPlacePopupOpen}
                                    onCardClick={setselectedCard}
                                    cards={cards}
                                    onCardDelete={handleCardDelete}
                                    onCardLike={handleCardLike}
                                />
                                <Footer />
                            </>
                        }
                    />
                    <Route
                        path='/'
                        element={
                            <Navigate to={isLoggedIn ? '/' : 'sign-in'} />
                        }
                    />
                </Routes>

                <EditProfilePopup
                    isOpen={isEditProfilePopupOpen}
                    onClose={closeAllPopups}
                    onUpdateUser={handleUpdateUser}
                    isLoading={isLoading}
                />

                <AddPlacePopup
                    isOpen={isAddPlacePopupOpen}
                    onClose={closeAllPopups}
                    onAddPlace={handleAddPlaceSubmit}
                    isLoading={isLoading}
                />

                <ImagePopup
                    card={selectedCard}
                    onClose={closeAllPopups}
                />

                <EditAvatarPopup
                    isOpen={isEditAvatarPopupOpen}
                    onClose={closeAllPopups}
                    onUpdateAvatar={handleUpdateAvatar}
                    isLoading={isLoading}
                />

                <InfoTooItip
                    title={isInfoToolTipData.title}
                    image={isInfoToolTipData.image}
                    isOpen={isInfoToolTipPopupOpen}
                    onClose={closeAllPopups}
                />
                <PopupWithForm
                    name='delete'
                    title='Вы уверены?'
                    buttonText='Да'
                />

            </div>
        </CurrentUserContext.Provider>
    );
}

export default App;

class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _request(url, options) {
    return fetch(url, options).then(this._checkQueryResult)
  }

  _checkQueryResult(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`); // если ошибка, отклоняем промис
  }

  //гет запрос подгрузки карточек с сервера
  getInitialCards() {
    return this._request(`${this._baseUrl}/cards`, {
      headers: this._headers
    })
  }

  //гет запрос подгрузки информации о пользователe с сервера
  getInformationUser() {
    return this._request(`${this._baseUrl}/users/me`, {
      headers: this._headers
    })
  }

  //oтредактированные данные профиля
  getEditedDataProfile(data) {
    return this._request(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        about: data.about
      })
    })
  }

  //добавление новой карточки
  addNewCard(data) {
    return this._request(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        link: data.link
      })
    })
  }

  //удаление карточки
  deleteCard(data) {
    return this._request(`${this._baseUrl}/cards/${data}`, {
      method: 'DELETE',
      headers: this._headers
    })
  }

  //поставка лайка карточки и удаление лайка карточки
  likeCard(data, isLiked) {
    return this._request(`${this._baseUrl}/cards/${data}/likes`, {
      method: `${isLiked ? 'PUT' : 'DELETE'}`,
      headers: this._headers
    })
  }

  //обновление аватара пользователя
  updateAvatarUser(cardId) {
    return this._request(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: cardId.avatar
      })
    })
  }
}

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-60',
  headers: {
    authorization: '6f07f13b-ebfd-4bd7-8abc-b504f7ebfeed',
    'Content-Type': 'application/json'
  }
});

export default api;
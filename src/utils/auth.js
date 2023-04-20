const _apiBaseUrl = 'https://auth.nomoreparties.co';

function checkQueryResult(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`); // если ошибка, отклоняем промис
}

// логин пользователя
export const loginUse = (email, password) => {
  return fetch(`${_apiBaseUrl}/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email,
      password: password,
    }),
  })
    .then(checkQueryResult)
};

//регистрация пользователя
export const registerUser = (email, password) => {
  return fetch(`${_apiBaseUrl}/signup`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email,
      password: password,
    }),
  })
    .then(checkQueryResult)
}

//запрос для проверки валидности токена и получения email
export const getToken = (jwt) => {
  return fetch(`${_apiBaseUrl}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${jwt}`,
    },
  })
    .then(checkQueryResult)
};

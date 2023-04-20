import React, { useState } from 'react';

function Login({ handleLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleChangeEmail(e) {
    setEmail(e.target.value)
  }

  function handleChangePassword(e) {
    setPassword(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin(email, password);
  }

  return (
    <div className="login">
      <h2 className="login__title">
        Вход
      </h2>
      <form onSubmit={handleSubmit} className="login__form">
        <input
          type="email"
          name="email"
          id="user-email"
          placeholder="Email"
          className="login__text login__text_type_title color"
          required
          onChange={handleChangeEmail}
          value={email || ''}
        />
        <input
          type="password"
          name="password"
          id="password"
          placeholder="Пароль"
          className="login__text login__text_type_title color"
          required
          onChange={handleChangePassword}
          value={password || ''}
        />
        <button type="submit" className="login__button">Войти</button>
      </form>
    </div>
  )
}

export default Login; 
import React from 'react';
import { Link } from "react-router-dom";
import logoMesto from '../images/logo_mesto.svg'

function Header({ title, onClick, email, route }) {
    return (
        <header className="header">
            <img className="header__logo" src={logoMesto} alt="Логотип место России" />
            <nav className='header__menu'>
                <p className='header__email'>{email}</p>
                <Link className='header__link-title'
                    type='button'
                    to={route}
                    onClick={onClick}
                >
                    {title}
                </Link>
            </nav>
        </header>
    )
}

export default Header;

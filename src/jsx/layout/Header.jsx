import React from 'react';
import { Link, useLocation } from 'react-router-dom';

import '../../css/header.scss';
import Logo from '../../images/bolo-64.png';

let menus = [
    {
        label: 'Home',
        link: '/',
    },
    {
        label: 'Metamask',
        link: '/metamask',
    },
    {
        label: 'Dashboard',
        link: '/dashboard',
    },
];

export default function Header() {
    const location = useLocation();

    return (
        <div id="header-container">
            <div className="header-row">
                <Link to={'/'}>
                    <img
                        src={Logo}
                        alt="bolo-logo"
                        className='logo-image'
                    />
                </Link>
            </div>
            <div className="header-row">
                <ul>
                    {menus.map(item => {
                        let active = item.link === location.pathname;
                        return (
                            <li key={item.label}>
                                <Link to={item.link}>
                                    <a className={active ? 'active' : ''}>{item.label}</a>
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </div>
    );
}

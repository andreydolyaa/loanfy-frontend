

import React, { useEffect } from 'react';
import './Nav.scss';
import { Link, useHistory } from 'react-router-dom';
import { SignOutIcon, HomeIcon, ProjectIcon } from '@primer/octicons-react'
import { useDispatch } from 'react-redux';
import { logout } from '../../../store/actions/userActions';



export default function Nav({ setAdminPanel,closeMenu }) {
    const dispatch = useDispatch();
    const history = useHistory();


    useEffect(() => {
    }, [])

    const adminLogout = () => {
        dispatch(logout());
    }

    const backToGlobalStats = () => {
        setAdminPanel(false);
    }

    const closeMobileMenu = () => {
        closeMenu();
    }


    return (
        <ul className="nav">
            <li><Link onClick={closeMobileMenu} to="/">Homepage</Link><HomeIcon size={16} className="ics" /></li>
            <li><Link to="/admin-panel" onClick={backToGlobalStats}>Global Stats</Link><ProjectIcon size={16} className="ics" /></li>
            <li><Link to="/" onClick={adminLogout}>Logout</Link><SignOutIcon size={16} className="ics" /></li>
        </ul>
    )
}

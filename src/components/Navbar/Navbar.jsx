

import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import './Navbar.scss';
import { motion } from "framer-motion"
import { SignOutIcon, GearIcon, ThreeBarsIcon } from '@primer/octicons-react';
import { useDispatch, useSelector } from 'react-redux';
import { loadUser, logout } from './../../store/actions/userActions';
import Calculator from './../Calculator/Calculator';

export default function Navbar({ toggleMobile }) {
    const history = useHistory();
    const dispatch = useDispatch();
    const user = useSelector(state => state.usersReducer.user);
    const userIsAdmin = useSelector(state => state.usersReducer.userData);

    useEffect(() => {
        if (user) dispatch(loadUser(user._id));
    }, [])

    const userLogout = () => {
        dispatch(logout());
        history.push('/');
    }

    const toMainPage = () => {
        history.push('/');
    }

    const pageTransition = {
        in: {
            opacity: 1,
            transition: { duration: 0.4 },
            y: 0
        },
        out: {
            opacity: 0,
            y: "-100%"
        }
    };

    const goToPersonalArea = () => {
        if (userIsAdmin && userIsAdmin.isAdmin === true) history.push('/admin-panel');
        else history.push('/personal-area');
    }

    const openMobileMenu = () => {
        toggleMobile();
    }

    const scrollToPrograms = () => window.scrollTo(0, 2000);
    const scrollToAbout = () => window.scrollTo(0, 3000);

    return (
        <motion.div initial="out" animate="in" exit="out" variants={pageTransition} className="navbar">
            <div className="inner flex">
                <h2 onClick={toMainPage}>loanfy</h2>
                <div className="mbl-hide">
                    <Link to="/">Home</Link>
                    <Link to="/" onClick={scrollToPrograms}>Programs</Link>
                    <Link to="/" onClick={scrollToAbout}>Company</Link>
                    <Link to="/calculator">Loan Calculator</Link>
                    <Link to="/signup">Join</Link>
                </div>
                {!user &&
                    <div className="mbl-hide">
                        <Link className="login" to="/login">Login</Link>
                        <Link className="signup" to="/signup">Signup</Link>
                    </div>
                }

                {user &&
                    <div className="logged-user flex">
                        <p>Hello, {user.username}!</p>
                        <div className="flex">
                            <div onClick={goToPersonalArea}>
                                <GearIcon size={16} className="icon ic" />
                            </div>
                            <div onClick={userLogout}>
                                <SignOutIcon size={16} className="ic" />
                            </div>
                        </div>
                    </div>
                }
                <div className="bars" onClick={openMobileMenu}>
                    <ThreeBarsIcon size={24} />
                </div>
            </div>

        </motion.div>
    )
}
// motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 1 }}
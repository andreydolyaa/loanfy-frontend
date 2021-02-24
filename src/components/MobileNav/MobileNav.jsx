

import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import './MobileNav.scss';
import { motion } from "framer-motion"
import { SignOutIcon, GearIcon } from '@primer/octicons-react';
import { useDispatch, useSelector } from 'react-redux';
import { loadUser, logout } from './../../store/actions/userActions';

export default function MobileNav({ closeMenu }) {
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

    const closeMenuLink = () => {
        closeMenu();
    }

    const goToPersonalArea = () => {
        if (userIsAdmin && userIsAdmin.isAdmin === true) history.push('/admin-panel');
        else history.push('/personal-area');
    }

    const scrollToPrograms = () => {
        window.scrollTo(0,3500);
        closeMenuLink();
    }


    const pageTransitionTopRight = {
        in: { opacity: 1, transition: { duration: 0.4 }, x: 0 },
        out: { opacity: 0, x: "200%" }
    };
    const pageTransitionTopLeft = {
        in: { opacity: 1, transition: { duration: 0.4 }, x: 0 },
        out: { opacity: 0, x: "-200%" }
    };

    return (
        <motion.div initial="out" animate="in" exit="out" variants={pageTransition} className="mobile-navbar">
            <div className="inner">
                
                <motion.div className="list" initial="out" animate="in" exit="out" variants={pageTransitionTopLeft}>
                    <Link onClick={closeMenuLink} to="/">Home</Link>
                    <Link onClick={scrollToPrograms} to="/">Programs</Link>
                    <Link onClick={closeMenuLink} to="/">Company</Link>
                    <Link onClick={closeMenuLink} to="/calculator">Loan Calculator</Link>
                    <Link onClick={closeMenuLink} to="/signup">Join</Link>
                </motion.div>
                {!user &&
                    <motion.div className="list" initial="out" animate="in" exit="out" variants={pageTransitionTopRight}>
                        <Link onClick={closeMenuLink} className="login" to="/login">Login</Link>
                        <Link onClick={closeMenuLink} className="signup" to="/signup">Signup</Link>
                    </motion.div>
                }

                {user &&
                    <motion.div className="logged-user list" initial="out" animate="in" exit="out" variants={pageTransitionTopRight}>
                        <p>Hello, {user.username}!</p>
                        <div className="icons-b flex" onClick={closeMenuLink}>
                            <div onClick={goToPersonalArea}>
                                <GearIcon size={16} className="icon ic" />
                            </div>
                            <div onClick={userLogout}>
                                <SignOutIcon size={16} className="ic" />
                            </div>
                        </div>
                    </motion.div>
                }
            </div>
        </motion.div>
    )
}

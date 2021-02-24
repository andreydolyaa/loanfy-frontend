

import React, { useEffect, useState } from 'react';
import './AdminPanel.scss';
import { useDispatch, useSelector } from 'react-redux';
import { loadUser, loadUsers } from '../../store/actions/userActions';
import UsersList from '../../components/AdminPanelCmps/UsersList/UsersList';
import GlobalStats from './../../components/AdminPanelCmps/GlobalStats/GlobalStats';
import Nav from '../../components/AdminPanelCmps/Nav/Nav';
import { useHistory } from 'react-router-dom';
import UserDetails from '../../components/AdminPanelCmps/UserDataCmps/UserDetails/UserDetails';
import { motion } from "framer-motion";
import UserContact from '../../components/AdminPanelCmps/UserDataCmps/UserContact/UserContact';

export default function AdminPanel({ setAdminPanel,closeMenu }) {
    const dispatch = useDispatch();
    const history = useHistory();
    const [userId, setUserId] = useState(null);
    const [currUser, setCurrUser] = useState();
    const users = useSelector(state => state.usersReducer.users);

    useEffect(() => {
        dispatch(loadUsers());
        setAdminPanel(true);
        return () => setAdminPanel(false);
    }, [])


    const getUserId = (userId) => {
        window.scrollTo(0, 0)
        setUserId(userId);
        var user = users.filter(user => user._id === userId);
        setCurrUser(user);
    }

    const pageTransition = {
        in: { opacity: 1, transition: { duration: 0.4 }, x: 0 },
        out: { opacity: 0, x: "-100%" }
    };
    const pageTransitionTopRight = {
        in: { opacity: 1, transition: { duration: 0.4 }, x: 0 },
        out: { opacity: 0, x: "100%" }
    };
    const pageTransitionBottom = {
        in: { opacity: 1, transition: { duration: 0.4 }, y: 0 },
        out: { opacity: 0, y: "100%" }
    };
    const pageTransitionTop = {
        in: { opacity: 1, transition: { duration: 0.4 }, y: 0 },
        out: { opacity: 0, y: "-100%" }
    };


    return users && (
        <div>

            {userId &&
                <div className="admin-panel">
                    <motion.div className="leftbar" initial="out" animate="in" exit="out" variants={pageTransition}>
                        <UsersList users={users} getUserId={getUserId} />
                    </motion.div>
                    <motion.div className="topbar" initial="out" animate="in" exit="out" variants={pageTransitionTop}>
                        <Nav setAdminPanel={setAdminPanel} closeMenu={closeMenu}/>
                    </motion.div>
                    <motion.div className="main" initial="out" animate="in" exit="out" variants={pageTransitionTopRight}>
                        <UserDetails user={currUser[0]} />
                    </motion.div>
                    <motion.div className="bottomone" initial="out" animate="in" exit="out" variants={pageTransitionBottom}>
                        <UserContact user={currUser[0]} />
                    </motion.div>
                </div>
            }
            {!userId &&
                <GlobalStats users={users}
                    getUserId={getUserId}
                    setAdminPanel={setAdminPanel}
                    closeMenu={closeMenu}
                />
            }



        </div>
    )
}



import React, { useEffect } from 'react';
import './PlanRegister.scss'
import { useSelector } from 'react-redux';
import { motion } from "framer-motion";
import Form from '../../components/Form/Form';
import { Link } from 'react-router-dom';

export default function PlanRegister(props) {
    const user = useSelector(state => state.usersReducer.user);

    useEffect(() => {

    }, [])

    const pageTransition = {
        in: {
            opacity: 1,
            // y: 0,
            transition: { duration: 0.5 }
        },
        out: {
            opacity: 0,
            // y: "-100vh",
        }
    };

    return (
        <div className="plan-register flex-center">
            <div className="inner">
                {!user &&
                    <div className="no-user">
                        <p>Please <Link to="/login">Login</Link> or <Link to="/signup">Signup</Link> to select a plan.</p>
                        <div className="lg">
                            <h1><span>loanfy</span></h1>
                        </div>
                    </div>}

                {user &&
                    <motion.div initial="out" animate="in" exit="out" variants={pageTransition}>
                        <Form />
                    </motion.div>
                }
                {user && user.loanDetails &&
                    <div className="ext no-user">
                        <p>Hi {user.username}, you already have a loan, please finish your previous loan before applying for a new one.</p>
                        <div className="lg">
                            <h1><span>loanfy</span></h1>
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}

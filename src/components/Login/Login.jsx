

import React, { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import './Login.scss';
import { useForm } from 'react-hook-form';
import { authService } from './../../services/authService';
import { loadUser, setLoggedUser } from '../../store/actions/userActions';
import { useHistory } from 'react-router-dom';
import { motion } from "framer-motion";
import { IssueOpenedIcon } from '@primer/octicons-react';

export default function Login() {
    const history = useHistory();
    const [err, setErr] = useState('');
    const [showDetails, setShow] = useState(false);
    const { register, handleSubmit, errors } = useForm();
    const dispatch = useDispatch();

    const onSubmit = async (data) => {
        var user = await authService.login(data);
        if (user.email) {
            dispatch(setLoggedUser(user));
            dispatch(loadUser(user._id));
            history.push('/');
        }
        else if (!user || !user.ok) {
            setErr(user.msg);
        }
    }

    const pageTransition = {
        in: { opacity: 1, transition: { duration: 0.4 }, x: 0 },
        out: { opacity: 0, x: "-100%" }
    };

    const openPopup = () => {
        setShow(showDetails => !showDetails);
    }

    return (
        <motion.div className="logins" initial="out" animate="in" exit="out" variants={pageTransition}>
            <form className="inner-z" onSubmit={handleSubmit(onSubmit)} >
                <h1>Login</h1>
                <div className="field">
                    <p>Email:</p>
                    <input type="text" placeholder="Your Email" name="email" ref={register} defaultValue="john@gmail.com"/>
                </div>
                <div className="field">
                    <p>Password:</p>
                    <input type="password" placeholder="Your Password" name="password" ref={register({ required: true })} defaultValue="123"/>
                </div>
                <button className="btn-z">Login</button>
                <div className="svg-img">
                    <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                        <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".25" className="shape-fill"></path>
                        <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" opacity=".5" className="shape-fill"></path>
                        <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" className="shape-fill"></path>
                    </svg>
                </div>
                <div className="q-mark" onClick={openPopup}>
                    <IssueOpenedIcon size={24} />
                    <p>Click here for login credentials</p>
                </div>
                {showDetails &&
                    <div className="display-hover">
                        <div className="rec">
                            <p>Admin Username: admin@loanfy.com</p>
                            <p>Admin Password: admin</p>
                        </div>
                        <div className="rec">
                            <p>User with existing loan: john@gmail.com</p>
                            <p>Password: 123</p>
                        </div>
                        <div className="rec">
                            <p>User without loans (can submit for a loan):</p>
                            <p>abc@gmail.com</p>
                            <p>Password: 123</p>
                        </div>
                    </div>
                }
                {err && <p className="err">{err}</p>}
            </form>
        </motion.div>
    )
}

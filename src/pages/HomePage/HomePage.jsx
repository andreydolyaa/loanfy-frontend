

import React, { useEffect, useState } from 'react';
import StarsAnimation from '../../components/StarsAnimation/StarsAnimation';
import './HomePage.scss';
// import img from '../../assets/img/predictive analytics (2).svg';
import dms from '../../assets/img/background.svg';
import { motion } from "framer-motion";
import Cards from '../../components/Cards/Cards';
import Plans from '../../components/Plans/Plans';
import Subscribe from '../../components/Subscribe/Subscribe';
import { useHistory } from 'react-router-dom';
import About from '../../components/About/About';


export default function HomePage() {
    const history = useHistory();


    const pageTransition = {
        in: {
            opacity: 1,
            // y: 0,
            transition: { duration: 0.8 }
        },
        out: {
            opacity: 0,
            // y: "-100vh",
        }
    };

    const goToSignup = () => history.push('/signup');

    const scrollToPrograms = () => window.scrollTo(0, 3500);


    return (
        <div>
            <div className="home-page flex-center">
                <StarsAnimation />
                <motion.div className="content flex-center" initial="out" animate="in" exit="out" variants={pageTransition}>
                    <div className="slogan">
                        <div>
                            <p>Money becomes accessible to everybody, everywhere.</p>
                            <h1>Loans made easy with <span>loanfy.</span> no complex terms and bureaucracy.</h1>
                        </div>
                        <div className="btns">
                            <button className="start" onClick={scrollToPrograms}>Start Now</button>
                            <button className="signup" onClick={goToSignup}>Signup</button>
                        </div>
                    </div>
                    <div className="svg-animation">
                        <object type="image/svg+xml" data={dms} className="svg"></object>
                    </div>
                </motion.div>
            </div>


            <div>
                <Cards />
            </div>
            <div>
                <Subscribe />
            </div>
            <div>
                <Plans />
            </div>
            <div>
                <About />
            </div>
        </div>
    )
}
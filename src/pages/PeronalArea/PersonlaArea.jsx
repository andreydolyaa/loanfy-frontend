

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './PersonalArea.scss';
import profileImg from '../../assets/img/user.png';
import { loadUser } from '../../store/actions/userActions';
import { ClockIcon, CreditCardIcon, ChecklistIcon, MailIcon, ProjectIcon, GraphIcon } from '@primer/octicons-react';
import { motion } from "framer-motion";
import UserMail from '../../components/UserMail/UserMail';
import { Link } from 'react-router-dom';

export default function PersonlaArea() {
    const dispatch = useDispatch();
    const [showMail, setShowMail] = useState(false);
    const userId = useSelector(state => state.usersReducer.user);
    const user = useSelector(state => state.usersReducer.userData);
    const numOfMails = useSelector(state => state.usersReducer.numOfMails);

    useEffect(() => {
        dispatch(loadUser(userId._id));
    }, [user])

    const formatNum = (num) => {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    const getNextPayment = () => {
        var currMonth = new Date().getMonth() + 2;
        var currDay = new Date().getDay() + 1;
        var currYear = new Date().getFullYear();
        if (user) {
            var nextPayment = user.loanDetails.paymentsList.filter(pay => {
                return currYear === pay.year && currMonth === pay.monthNum && currDay < pay.monthDay
            })
            return nextPayment;
        }
    }

    const monthlyInterestOnly = () => {
        var num = (user.loanDetails.totalInterestToPay / user.loanDetails.numOfPayments);
        return num.toFixed(0);
    }

    const getCurrPaymentNum = () => {
        var currMonth = new Date().getMonth() + 2;
        var currDay = new Date().getDay() + 1;
        var currYear = new Date().getFullYear();
        var paymentNum = user.loanDetails.paymentsList.findIndex(pay => {
            return currYear === pay.year && currMonth === pay.monthNum && currDay < pay.monthDay;
        })
        return paymentNum + 1;
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

    const showStats = () => {
        setShowMail(false);
    }

    const showMessages = (ev) => {
        ev.stopPropagation();
        setShowMail(true);

    }

    return (
        <div className="personal-area">
            {user && !user.loanDetails &&
                <div className="not-sb">
                    <p>You have still not submitted for a loan, please go to <Link to="/">Home page</Link> and click start now.</p>
                </div>
            }
            {user && user.loanDetails &&
                <div className="inner">

                    <motion.div className="main" initial="out" animate="in" exit="out" variants={pageTransition}>
                        <div className="loan-details flex-center">
                            <h3>Loan Details</h3>

                            <div onClick={showStats} className="flex-center icons">
                                <ProjectIcon size={24} className="icon" />
                                <div onClick={showMessages} className="email">
                                    <div className="msg flex-center">{numOfMails.length}</div>
                                    <MailIcon size={24} className="icon" />
                                </div>

                            </div>

                        </div>
                        {!showMail &&
                            <div className="details">
                                <div>
                                    <p>Total loan sum recieved</p>
                                    <p className="num">${formatNum(user.loanDetails.loanAmount)}</p>
                                </div>
                                <div>
                                    <p>Number of payments</p>
                                    <p className="num">{user.loanDetails.numOfPayments}</p>
                                </div>
                                <div>
                                    <p>Total interest to pay</p>
                                    <p className="num">${formatNum(user.loanDetails.totalInterestToPay.toFixed(0))}</p>
                                </div>
                                <div>
                                    <p>Monthly return without interest</p>
                                    <p className="num">${formatNum(user.loanDetails.monthlyReturnWithoutInterest.toFixed(0))}</p>
                                </div>
                                <div>
                                    <p>Monthly return with interest</p>
                                    <p className="num">${formatNum(user.loanDetails.monthlyReturnWithInterest.toFixed(0))}</p>
                                </div>
                                <div>
                                    <p>Monthly interest only </p>
                                    <p className="num">${formatNum(monthlyInterestOnly())}</p>
                                </div>
                                <div className="num2">
                                    <p>Left to pay </p>
                                    <p className="num n">${formatNum(user.loanDetails.numOfMoneyLeftToPay)}</p>
                                </div>
                                <div className="num2">
                                    <p>Total payed so far </p>
                                    <p className="num ">${formatNum(user.loanDetails.amountPayed)}</p>
                                </div>
                                <div className="num2">
                                    <p>Number of payments left</p>
                                    <p className="num ">{formatNum(user.loanDetails.numOfPaymentsLeft)}</p>
                                </div>
                                <div className="end">
                                    <p>Loan end date</p>
                                    <p className="num">{user.loanDetails.loanEndDate}</p>
                                </div>
                            </div>



                        }
                        {showMail &&
                            <div className="mail"><UserMail user={user} /></div>}

                    </motion.div>



                    <motion.div className="sidetop" initial="out" animate="in" exit="out" variants={pageTransitionTopRight}>
                        <div className="img">
                            <img src={profileImg} />
                            <h3>{user.loanDetails.firstName} {user.loanDetails.lastName}</h3>
                        </div>
                        <p>Email: <span>{user.loanDetails.email}</span></p>
                        <p>Address: <span>{user.loanDetails.address}</span></p>
                        <p>Phone Number: <span>{user.loanDetails.phone}</span></p>
                        <p>Bank Account Number: <span>{user.loanDetails.bankAccountNum}</span></p>
                        <div className="svg">
                            <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                                <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".25" class="shape-fill"></path>
                                <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" opacity=".5" class="shape-fill"></path>
                                <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" class="shape-fill"></path>
                            </svg>
                        </div>
                    </motion.div>

                    <motion.div className="leftbottom" initial="out" animate="in" exit="out" variants={pageTransition}>
                        <div className="titlex">
                            <h3>Interest calculation </h3>
                        </div>
                        <p>Yearly interest consists of -</p>
                        <p>{user.loanDetails.loanProgramData.name} program interest is - {user.loanDetails.loanProgramData.interest}%</p>
                        <p>Market interest of {user.loanDetails.loanProgramData.marketInterest}%</p>
                        <p>Prime interest of {user.loanDetails.loanProgramData.prime}%</p>
                        <p>Risk management interest of {user.loanDetails.loanProgramData.riskInterest}%</p>
                        <p>Total Interest Of: {user.loanDetails.totalInterestsCombined}%</p>
                    </motion.div>

                    <motion.div className="middlebottom" initial="out" animate="in" exit="out" variants={pageTransitionBottom}>
                        <div className="next flex-space">
                            <p>Next Payment At: <span>{getNextPayment()[0].date}</span></p>
                            <ClockIcon size={24} className="iconb" />
                        </div>
                        <div className="am flex-space">
                            <p>Amount: <span>${formatNum(getNextPayment()[0].payment.toFixed(0))}</span></p>
                            <CreditCardIcon size={24} className="iconb" />
                        </div>
                        <div className="outof flex-space">
                            <p>Payment <span>{getCurrPaymentNum()}</span> out of <span>{user.loanDetails.paymentsList.length}</span></p>
                            <ChecklistIcon size={24} className="iconb" />
                        </div>
                    </motion.div>

                    <motion.div className="rightbottom" initial="out" animate="in" exit="out" variants={pageTransitionTopRight}>
                        <div className="titlex">
                            <h3>Payments List</h3>
                        </div>
                        {user.loanDetails.paymentsList.map((pay, idx) => {
                            return (
                                <div className="payment" key={pay.date}>
                                    <p className="payone">Payment {idx + 1}</p>
                                    <p>Date: {pay.date}</p>
                                    <p>Sum: ${formatNum(pay.payment.toFixed(0))}</p>
                                </div>
                            )
                        })}
                    </motion.div>
                </div>
            }
        </div>
    )
}

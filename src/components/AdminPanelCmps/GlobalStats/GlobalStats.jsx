

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import UsersList from '../UsersList/UsersList';
import './GlobalStats.scss';
import { motion } from "framer-motion";
import ChartLine from '../ChartLine/ChartLine';
import Nav from '../Nav/Nav';
import SendMsg from '../SendMsg/SendMsg';




export default function GlobalStats({ users, getUserId, setAdminPanel,closeMenu }) {
    const dispatch = useDispatch();
    const totalLoan = useSelector(state => state.usersReducer.totalLoan);
    const totalInterest = useSelector(state => state.usersReducer.totalInterestReturn);
    const usersJoinedThisMonth = useSelector(state => state.usersReducer.usersJoined);
    const thisMonthProfit = useSelector(state => state.usersReducer.thisMonthProfit);
    const totalLoanReturned = useSelector(state => state.usersReducer.totalLoanReturned);
    const highestLoanTaken = useSelector(state => state.usersReducer.heighstLoanTaken);


    // useEffect(() => {
    //     window.scrollTo(0, 0)
    // }, [])

    const formatNum = (num) => {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
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


    return (
        <div className="global-stats">

            <motion.div className="leftbar" initial="out" animate="in" exit="out" variants={pageTransition}>
                <UsersList users={users} getUserId={getUserId} />
            </motion.div>



            <motion.div className="topbar" initial="out" animate="in" exit="out" variants={pageTransitionTop}>
                <Nav setAdminPanel={setAdminPanel} closeMenu={closeMenu}/>
            </motion.div>



            <motion.div className="main" initial="out" animate="in" exit="out" variants={pageTransitionTopRight}>
                <div className="title">
                    <p>loanfy Global Stats</p>
                </div>
                <div className="details">
                    <div className="borrowed">
                        <p>Total loans borrowed:</p>
                        <span>${formatNum(totalLoan)}</span>
                    </div>
                    <div className="this-return">
                        <p>Total profit with interest:</p>
                        <span>${formatNum((totalLoan + totalInterest).toFixed(0))}</span>
                    </div>
                    <div className="total-users">
                        <p>Total users with loans:</p>
                        <span className="num">{users.length}</span>
                    </div>
                    <div className="month-profit">
                        <p>This month profit</p>
                        <span className="num1">${formatNum(thisMonthProfit.toFixed(0))}</span>
                        <p className="small-text">*Includes loan & total interest</p>
                    </div>
                    <div className="loan-returned">
                        <p>Total loan returned:</p>
                        <span className="num1">${formatNum(totalLoanReturned.toFixed(0))}</span>
                        <p className="small-text">*Includes loan & total interest</p>
                    </div>
                    <div className="left-to-return red">
                        <p>Total left to return:</p>
                        <span className="num2">${formatNum((((totalLoan + totalInterest)) - totalLoanReturned).toFixed(0))}</span>

                    </div>
                </div>
            </motion.div>


            <motion.div className="bottomone flex-center" initial="out" animate="in" exit="out" variants={pageTransitionBottom}>
                <ChartLine
                    totalLoan={totalLoan}
                    totalInterest={totalInterest}
                    totalLoanReturned={totalLoanReturned}
                />
            </motion.div>


            {highestLoanTaken &&
                <motion.div className="bottomtwo" initial="out" animate="in" exit="out" variants={pageTransitionBottom}>
                    <h3>Highest loan taken: </h3>
                    <p>By <span>{highestLoanTaken.loanDetails.firstName} {highestLoanTaken.loanDetails.lastName}</span></p>
                    <p>Amount: <span>${formatNum(highestLoanTaken.loanDetails.loanAmount)}</span></p>
                    <p>Total interest to return <span>${formatNum(highestLoanTaken.loanDetails.totalInterestToPay)}</span></p>
                    <p>Total to return <span>${formatNum(highestLoanTaken.loanDetails.totalInterestToPay
                        + highestLoanTaken.loanDetails.loanAmount)}</span></p>
                    <p>Number of payments: <span>{highestLoanTaken.loanDetails.numOfPayments}</span></p>
                    <p>Monthly return: <span>${formatNum(highestLoanTaken.loanDetails.monthlyReturnWithInterest)}</span></p>
                    <p>Returned by now: <span>${formatNum(highestLoanTaken.loanDetails.amountPayed)}</span></p>
                    <p>Left to return: <span>${formatNum(highestLoanTaken.loanDetails.numOfMoneyLeftToPay)}</span></p>
                    <p>Last payment date: <span>{highestLoanTaken.loanDetails.loanEndDate}</span></p>
                </motion.div>}


            <motion.div className="bottomthree" initial="out" animate="in" exit="out" variants={pageTransitionBottom}>
                <SendMsg />
            </motion.div>


        </div>
    )
}
// <UsersList users={users} getUserId={getUserId} />
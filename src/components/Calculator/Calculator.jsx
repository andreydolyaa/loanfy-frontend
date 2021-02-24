

import React, { useEffect, useRef, useState } from 'react';
import './Calculator.scss';
import { useSelector, useDispatch } from 'react-redux';
import { calcLoan } from './../../store/actions/loanActions';
import { motion } from "framer-motion";
import { loanReducer } from './../../store/reducers/loanReducer';

export default function Calculator() {
    const dispatch = useDispatch();
    const loanRef = useRef();
    const paymentsRef = useRef();
    const amountRef = useRef();


    const fixed = useSelector(state => state.loanReducer.fixed);
    const global = useSelector(state => state.loanReducer.global);
    const secured = useSelector(state => state.loanReducer.secured);
    const loanCalculatorData = useSelector(state => state.loanReducer.loanCalc);
    const [currProgram, setProgram] = useState(fixed);


    useEffect(() => {
        // setProgram(fixed)
    }, [fixed,secured,global]);


    const getLoanProgram = () => {
        if (loanRef.current.value === 'fixed') setProgram(fixed);
        if (loanRef.current.value === 'global') setProgram(global);
        if (loanRef.current.value === 'secured') setProgram(secured);
    }


    const calculateLoan = (ev) => {
        ev.preventDefault();
        var loanData = {
            amount: +amountRef.current.value,
            paymentsNum: +paymentsRef.current.value,
            program: currProgram
        }
        dispatch(calcLoan(loanData));
        amountRef.current.value = 0;
        paymentsRef.current.value = 0;
    }


    const formatNum = (num) => {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    const pageTransition = {
        in: { opacity: 1, transition: { duration: 0.4 }, x: 0 },
        out: { opacity: 0, x: "-100%" }
    };
    const pageTransitionRight = {
        in: { opacity: 1, transition: { duration: 0.4 }, x: 0 },
        out: { opacity: 0, x: "100%" }
    };


    return (
        <div className="calculator flex">
            <motion.div initial="out" animate="in" exit="out" variants={pageTransitionRight}>
                <h1>Loan Calculator</h1>
            </motion.div>
            <motion.div className="inner-h" initial="out" animate="in" exit="out" variants={pageTransition}>
                {currProgram &&
                    <form onSubmit={calculateLoan}>
                        <div className="select">
                            <p>Select loan program:</p>
                            <select onChange={getLoanProgram} ref={loanRef}>
                                <option value="fixed">Fixed Program</option>
                                <option value="global">Global Program</option>
                                <option value="secured">Secured Program</option>
                            </select>
                        </div>
                        <div className="select">
                            <p>Loan Amount: </p>
                            <input type="number" placeholder="Loan Amount" ref={amountRef} required />

                        </div>
                        <div>
                            <p className="sm">Minimum loan amount for the {currProgram.name} program is ${formatNum(currProgram.minLoanAmount)}</p>
                            <p className="sm">Maximum loan amount for the {currProgram.name} program is ${formatNum(currProgram.maxLoanAmount)}</p>
                        </div>
                        <div className="select">
                            <p>Select number of payments: </p>
                            <input type="number" min="0" max={+currProgram.maxNumOfPayments} ref={paymentsRef} required placeholder="Number of payments" />
                        </div>
                        <div>
                            <p className="sm">Max number of payments for the {currProgram.name} program is {currProgram.maxNumOfPayments}</p>
                        </div>
                        <button>Calculate</button>
                    </form>
                }
                {loanCalculatorData &&
                    <div className="inner-two">
                        <p>Total interest ${loanCalculatorData.interest.toFixed(0)}</p>
                        <p>Total loan with interest ${loanCalculatorData.loanTotal.toFixed(0)}</p>
                        <p>Monthly payment ${loanCalculatorData.monthlyPayment.toFixed(0)}</p>
                    </div>
                }
            </motion.div>
        </div>
    )
}

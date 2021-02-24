

import React, { useEffect, useRef, useState } from 'react';
import './Form.scss';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import LoanBox from '../LoanBox/LoanBox';
import { loanService } from './../../services/loanService';
import { loadUser } from '../../store/actions/userActions';
import { setCurrentLoanSelected } from '../../store/actions/loanActions';
import { useHistory } from 'react-router-dom';


export default function Form() {
    const history = useHistory();
    const fixedLoan = useSelector(state => state.loanReducer.fixed);
    const globalLoan = useSelector(state => state.loanReducer.global);
    const securedLoan = useSelector(state => state.loanReducer.secured);
    const userId = useSelector(state => state.usersReducer.user);
    const user = useSelector(state => state.usersReducer.userData);
    const loanTypeRef = useRef();
    const [currentLoanSelected, setCurrentLoan] = useState(fixedLoan);
    const [numOfPayments, setPayments] = useState([]);
    const [submitSuccess, setSubmit] = useState('');
    const dispatch = useDispatch();
    const { register, handleSubmit, errors } = useForm({
        defaultValues: {

        }
    });

    useEffect(() => {
        dispatch(loadUser(userId._id));
    }, [])
    useEffect(() => {
        if (currentLoanSelected) {
            setPayments([...Array(currentLoanSelected.maxNumOfPayments).keys()].map(i => i + 1));
        }
        dispatch(setCurrentLoanSelected(currentLoanSelected));
    }, [currentLoanSelected])



    const submitLoan = async (data) => {
        var loanData = {
            loanData: data,
            user: user,
            loanProgramData: currentLoanSelected
        }
        const res = await loanService.handleFixedLoanRequest(loanData);
        setSubmit(res);
        var interval = setInterval(() => {
            history.push('/');
            clearInterval(interval);
        }, 3000)
    }

    const loanTypeSeleted = () => {
        if (loanTypeRef.current.value === 'fixed') setCurrentLoan(fixedLoan);
        else if (loanTypeRef.current.value === 'global') setCurrentLoan(globalLoan);
        else if (loanTypeRef.current.value === 'secured') setCurrentLoan(securedLoan);
        setPayments([...Array(currentLoanSelected.maxNumOfPayments).keys()].map(i => i + 1));
    }

    return (
        <div className="form">
            <form className="container" onSubmit={handleSubmit(submitLoan)}>
                {user && !user.loanDetails &&
                    <div className="left">
                        <div className="inners">
                            <h3>Fill the application to submit for a loan.</h3>
                            <div>
                                <label htmlFor="loanType">Loan Program Type:
                        <select name="loanType" ref={register} ref={loanTypeRef} onChange={loanTypeSeleted}>
                                        <option value="fixed" className="option">Fixed Program</option>
                                        <option value="global" className="option">Global Program</option>
                                        <option value="secured" className="option">Secured Program</option>
                                    </select>
                                </label>
                            </div>
                            <div>
                                <label htmlFor="firstName">First Name:
                        <input type="text" placeholder="First Name" name="firstName" required ref={register} />
                                </label>
                            </div>
                            <div className="first-last-name">
                                <label htmlFor="lastName">Last Name:
                        <input type="text" placeholder="Last Name" name="lastName" required ref={register} />
                                </label>
                            </div>
                            <div>
                                <label htmlFor="age">Age:
                        <input type="number" min="18" placeholder="Age" name="age" required ref={register} />
                                </label>
                            </div>
                            <div>
                                <label htmlFor="address">Address:
                        <input type="text" placeholder="Address" name="address" required ref={register} />
                                </label>
                            </div>
                            <div>
                                <label htmlFor="phone">Phone:
                        <input type="text" placeholder="Phone" name="phone" required ref={register} />
                                </label>
                            </div>
                            <div>
                                <label htmlFor="phone">Loan Amount:
                        <input type="number" min={currentLoanSelected.minLoanAmount} max={currentLoanSelected.maxLoanAmount}
                                        placeholder="Loan Amount" name="loanAmount" required ref={register} />
                                </label>
                            </div>
                            <div>
                                <label htmlFor="numOfPayments">Number of payments:
                        <select name="numOfPayments" ref={register}>
                                        {numOfPayments.map(num => {
                                            return <option key={num} value={num}>{num}</option>
                                        })}
                                    </select>
                                </label>
                            </div>
                            <div>
                                <label htmlFor="phone">Bank Account Number:
                        <input type="number" placeholder="Account Number" name="bankAccountNum" required ref={register} />
                                </label>
                            </div>
                        </div>
                        <div className="btn">
                            <button>Apply for loan</button>
                        </div>

                        {submitSuccess &&
                            <div className="success">
                                <p>{submitSuccess}</p>
                            </div>}
                    </div>}
                {user && !user.loanDetails &&
                    <div className="right">
                        <div className="img"></div>
                        <LoanBox />
                    </div>}
            </form>

        </div>
    )
}
// LoanBox currentLoanSelected={currentLoanSelected}

// {submitSuccess &&
//     <div className="success">
//         <p>{submitSuccess}</p>
//     </div>}
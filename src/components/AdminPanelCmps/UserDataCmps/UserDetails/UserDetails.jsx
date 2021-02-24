

import React, { useEffect } from 'react';
import './UserDetails.scss';

export default function UserDetails({ user }) {

    useEffect(() => {

    }, [user])

    const formatNum = (num) => {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    const monthlyInterestOnly = () => {
        var num = (user.loanDetails.totalInterestToPay / user.loanDetails.numOfPayments);
        return num.toFixed(0);
    }


    return (
        <div className="user-details">

            <div className="loan-details">
                <h3>Loan Details</h3>
            </div>

            <div className="details">
                <div>
                    <p>Total loan sum recieved:</p>
                    <p className="num">${formatNum(user.loanDetails.loanAmount)}</p>
                </div>
                <div>
                    <p>Number of payments:</p>
                    <p className="num">{user.loanDetails.numOfPayments}</p>
                </div>
                <div>
                    <p>Total interest to pay:</p>
                    <p className="num">${formatNum(user.loanDetails.totalInterestToPay.toFixed(0))}</p>
                </div>
                <div>
                    <p>Monthly return without interest:</p>
                    <p className="num">${formatNum(user.loanDetails.monthlyReturnWithoutInterest.toFixed(0))}</p>
                </div>
                <div>
                    <p>Monthly return with interest:</p>
                    <p className="num">${formatNum(user.loanDetails.monthlyReturnWithInterest.toFixed(0))}</p>
                </div>
                <div>
                    <p>Monthly interest only: </p>
                    <p className="num">${formatNum(monthlyInterestOnly())}</p>
                </div>
                <div className="num2">
                    <p>Left to pay: </p>
                    <p className="num n">${formatNum(user.loanDetails.numOfMoneyLeftToPay)}</p>
                </div>
                <div className="num2">
                    <p>Total payed so far: </p>
                    <p className="num ">${formatNum(user.loanDetails.amountPayed)}</p>
                </div>
                <div className="num2">
                    <p>Number of payments left:</p>
                    <p className="num ">{formatNum(user.loanDetails.numOfPaymentsLeft)}</p>
                </div>
            </div>

            
        </div>
    )
}

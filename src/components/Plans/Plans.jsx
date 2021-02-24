

import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import './Plans.scss';
import shield from '../../assets/img/icons/shield.png';
import medal from '../../assets/img/icons/medal.png';
import calendar from '../../assets/img/icons/calendar.png';
import { useDispatch } from 'react-redux';
import { setLoanType } from '../../store/actions/loanActions';

export default function Plans() {
    const dispatch = useDispatch();
    const history = useHistory();

    const goToReg = () => {
        history.push('/plan-register')
    }
    return (
        <div className="plans">
            <h1>Our Programs</h1>

            <div className="inner">
                <div className="plan">
                    <h1>Fixed Program</h1>
                    <img src={calendar} />
                    <p>In the Fixed program you will return the loan on a monthly basis with a yearly 2% interest.</p>
                    <p className="intr">2% Yearly Interest + 2.5% Market Interest + 0.5% Risk Managment</p>
                    <p className="duration">Loan Duration 1 - 360 Months</p>
                    <a onClick={goToReg}>Select</a>
                </div>
                <div className="plan">
                    <h1>Global Program</h1>
                    <img src={medal} />
                    <p>In the Global program you will return only yearly interest, and the rest at the end of the loan period.</p>
                    <p className="intr">3% Yearly Interest + 2.5% Market Interest + 1% Risk Managment</p>
                    <p className="duration">Loan Duration 1 - 240 Months</p>
                    <a onClick={goToReg}>Select</a>
                </div>
                <div className="plan">
                    <h1>Secured Program</h1>
                    <img src={shield} />
                    <p>In the Secured program there is no monthly returns, the interest and the loan returned at the end of the loan period.</p>
                    <p className="intr">9% Yearly Interest + 2.5% Market Interest + 5% Risk Managment</p>
                    <p className="duration">Loan Duration 1 - 120 Months</p>
                    <a onClick={goToReg}>Select</a>
                </div>
            </div>


        </div>
    )
}


import { loanService } from './../../services/loanService';
export function setLoanType(type) {
    return dispatch => {
        dispatch({ type: 'SET_LOAN_TYPE', type });
        console.log('type: ', type);
    }
}

export function setCurrentLoanSelected(loan) {
    return dispatch => {
        // console.log(loan);
        dispatch({ type: 'CURRENT_LOAN', loan });
    }
}

export function calcLoan(loanData) {
    return dispatch => {
        var loan = loanService.calculatorData(loanData);
        dispatch({ type: 'SET_LOAN_CALC', loan })
    }
}

export function setLoanCalcNull() {
    return dispatch => {
        dispatch({ type: 'SET_LOAN_NULL' });
    }
}
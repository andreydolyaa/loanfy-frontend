

const INITIAL_STATE = {
    currentLoanSelected:{},
    loanType: {},
    fixed: {
        name: 'Fixed',
        interest: 2,
        marketInterest: 2.5,
        riskInterest: 0.5,
        prime: 1.7,
        minLoanAmount: 5000,
        maxLoanAmount: 100000000,
        maxNumOfPayments: 360,
        loanStartData: null,
        loanEndDate: null
    },
    global: {
        name: 'Global',
        interest: 4,
        marketInterest: 2.5,
        riskInterest: 1.5,
        prime: 1.7,
        minLoanAmount: 5000,
        maxLoanAmount: 15000000,
        maxNumOfPayments: 240,
        loanStartData: null,
        loanEndDate: null
    },
    secured: {
        name: 'Secured',
        interest: 9,
        marketInterest: 2.5,
        riskInterest: 5,
        prime: 1.7,
        minLoanAmount: 150000,
        maxLoanAmount: 450000000,
        maxNumOfPayments: 120,
        loanStartData: null,
        loanEndDate: null
    },
    loanCalc: null
}

export function loanReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case 'CURRENT_LOAN':
            return {
                ...state,
                currentLoanSelected: action.loan
            }
        case 'SET_LOAN_TYPE':
            return {
                ...state,
                loanType: action.type === "fixed" ? state.fixed : action.type === "secured" ? state.secure : state.global
            }
        case 'SET_LOAN_CALC':
            return {
                loanCalc: action.loan
            }
        case 'SET_LOAN_NULL':
            return {
                loanCac: null
            }
        default:
            return state;
    }
}


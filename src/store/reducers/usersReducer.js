var localLoggedInUser = null;
if (sessionStorage.user) localLoggedInUser = JSON.parse(sessionStorage.user);

const INITIAL_STATE = {
    users: [],
    user: localLoggedInUser,
    userData: null,
    totalLoan: 0,
    totalInterestReturn: 0,
    usersJoined: 0,
    currentMonth: new Date().getMonth() + 2,
    thisMonthProfit: 0,
    totalLoanReturned: 0,
    heighstLoanTaken: null,
    numOfMails: 0,
}

export function usersReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case 'SET_USERS':
            return {
                ...state,
                users: action.fltrUsers,
                totalLoan: action.fltrUsers.reduce((acc, user) => {
                    return acc + user.loanDetails.loanAmount;
                }, 0),
                totalInterestReturn: action.fltrUsers.reduce((acc, user) => {
                    return acc + user.loanDetails.totalInterestToPay;
                }, 0),
                usersJoined: action.fltrUsers.filter(user => {
                    return user.loanDetails.paymentsList[0].monthNum === state.currentMonth;
                }),
                thisMonthProfit: action.fltrUsers.reduce((acc, user) => {
                    return acc + user.loanDetails.monthlyReturnWithInterest;
                }, 0),
                totalLoanReturned: action.fltrUsers.reduce((acc, user) => user.loanDetails.amountPayed ? acc += user.loanDetails.amountPayed : acc + 0, 0),
                heighstLoanTaken: action.fltrUsers.sort((a, b) => b.loanDetails.loanAmount - a.loanDetails.loanAmount)[0]
            }
        case 'SET_USER':
            return {
                ...state,
                user: action.user
            }
        case 'LOGOUT':
            return {
                ...state,
                user: null,
                userData: null
            }
        case 'SET_NEW_USER':
            return {
                ...state,
                userData: action.user,
                numOfMails: action.user.loanDetails ? action.user.loanDetails.messages.filter(msg => !msg.isRead) : null
            }
        default:
            return state;
    }
}
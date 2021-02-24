import moment from 'moment';
import axios from 'axios';
import { usersService } from './usersService';


const BASE_URL = process.env.NODE_ENV === 'production'
    ? '/api/users'
    : 'http://localhost:3001/api/users'


export const loanService = {
    handleFixedLoanRequest,
    calculatorData,
}


async function handleFixedLoanRequest(data) {
    var succsess = 'You have submitted for the loan, Redirecting...'
    var loanStartDate = moment().format("DD/MM/YYYY");
    var loanEndDate = _calculateLoanDuration(data);
    var loanData = {
        loanStartDate,
        loanEndDate,
        firstName: data.loanData.firstName,
        lastName: data.loanData.lastName,
        email: data.user.email,
        age: data.loanData.age,
        address: data.loanData.address,
        phone: data.loanData.phone,
        loanAmount: +data.loanData.loanAmount,
        numOfPayments: +data.loanData.numOfPayments,
        bankAccountNum: data.loanData.bankAccountNum,
        loanProgramData: data.loanProgramData,
        totalInterestToPay: _calculateInterest(data),
        monthlyReturnWithInterest: _calculateMonthlyReturn(data),
        monthlyReturnWithoutInterest: +data.loanData.loanAmount / data.loanData.numOfPayments,
        paymentsList: _monthlyPaymentsList(data),
        totalInterestsCombined: data.loanProgramData.interest + data.loanProgramData.riskInterest + data.loanProgramData.marketInterest + data.loanProgramData.prime,
        messages: []
    }
    const user = await usersService.getUserById(data.user._id);
    var newUser = JSON.parse(JSON.stringify(user));
    newUser.loanDetails = loanData
    newUser.loanDetails.numOfPaymentsLeft = _paymentsLeft(newUser);
    newUser.loanDetails.numOfMoneyLeftToPay = _moneyLeftToPay(newUser);
    newUser.loanDetails.amountPayed = _moneyPayed(newUser);
    await usersService.updateUser(data.user._id, newUser);
    return succsess;
}


function _calculateLoanDuration(data) {
    var startDate = moment();
    var endDate = startDate.add(+data.loanData.numOfPayments, 'months');
    return endDate.format("DD/MM/YYYY");
}



function _calculateMonthlyReturn(data) {
    var totalAmount = +data.loanData.loanAmount;
    var monthlyAmount = (totalAmount + _calculateInterest(data)) / +data.loanData.numOfPayments;
    return monthlyAmount;
}


function _calculateInterest(data) {
    var interest = (+data.loanData.loanAmount / 100) *
        (data.loanProgramData.interest + data.loanProgramData.riskInterest + data.loanProgramData.marketInterest +
            data.loanProgramData.prime);
    return interest;
}


function _monthlyPaymentsList(data) {
    var totalSum = +data.loanData.loanAmount;
    var totalPayments = +data.loanData.numOfPayments;
    var month = moment();
    var paymentData = [];
    for (var i = 0; i < data.loanData.numOfPayments; i++) {
        paymentData.push({
            date: month.add(1, "months").format("DD/MM/YYYY"),
            payment: (totalSum / totalPayments) + (_calculateInterest(data) / totalPayments),
            monthNum: +month.format('M'),
            monthDay: +month.format('D'),
            year: +month.format('Y'),
        });
    }
    return paymentData;
}



function _paymentsLeft(data) {
    // var startDate = moment("17/2/2018", "DD/MM/YYYY");
    // var currentDate = moment(new Date()).format("DD/MM/YYYY");
    // var endDate = moment(currentDate, "DD/MM/YYYY");
    // var res = endDate.diff(startDate, 'months');
    // return data.loanDetails.numOfPayments - res;
    var startDate = moment(data.loanDetails.loanStartDate, "DD/MM/YYYY");
    var currentDate = moment(new Date()).format("DD/MM/YYYY");
    var endDate = moment(currentDate, "DD/MM/YYYY");
    var res = endDate.diff(startDate, 'months');
    return data.loanDetails.numOfPayments - res;
}

function _moneyLeftToPay(data) {
    var numOfpaymentsPayed = data.loanDetails.numOfPayments - _paymentsLeft(data);
    var amountPayed = data.loanDetails.monthlyReturnWithInterest * numOfpaymentsPayed;
    var leftToPay = (data.loanDetails.loanAmount + data.loanDetails.totalInterestToPay) - amountPayed;
    return leftToPay.toFixed(2);
}

function _moneyPayed(data) {
    var numOfpaymentsPayed = data.loanDetails.numOfPayments - _paymentsLeft(data);
    var amountPayed = data.loanDetails.monthlyReturnWithInterest * numOfpaymentsPayed;
    return amountPayed;
}


function calculatorData(data) {
    const { interest, marketInterest, prime, riskInterest } = data.program;
    const totalInterest = interest + marketInterest + prime + riskInterest;
    const loanInterestOnly = (data.amount / 100) * totalInterest;
    const loanAndInterest = data.amount + loanInterestOnly;
    const monthlyPayment = loanAndInterest / data.paymentsNum;
    return { interest: loanInterestOnly, loanTotal: loanAndInterest, monthlyPayment: monthlyPayment }
}
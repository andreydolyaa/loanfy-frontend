
import { usersService } from './../../services/usersService';
import { authService } from './../../services/authService';
import { loanService } from './../../services/loanService';

export function loadUsers() {
    return async dispatch => {
        const users = await usersService.loadUsers();
        const fltrUsers = users.filter(user => user.loanDetails);
        // console.log(fltrUsers);
        dispatch({ type: 'SET_USERS', fltrUsers });
    }
}

export function loadUser(userId) {
    return async dispatch => {
        const user = await usersService.getUserById(userId);
        dispatch({ type: 'SET_NEW_USER', user })
    }
}

export function setLoggedUser(user) {
    return dispatch => {
        dispatch({ type: 'SET_USER', user });
        // console.log(',dis',user);
    }
}

export function logout() {
    return dispatch => {
        authService.logout();
        dispatch({ type: 'LOGOUT' })
    }
}



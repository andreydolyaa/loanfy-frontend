import axios from 'axios';
import { usersService } from './usersService';

const BASE_URL = process.env.NODE_ENV === 'production'
    ? '/api/auth'
    : 'http://localhost:3001/api/auth'



export const authService = {
    signup,
    login,
    logout
}


async function login(userData) {
    const user = await axios.post(`${BASE_URL}/login`, userData);
    var newUser = await usersService.getUserByEmail(userData.email);
    if (user.data.email === newUser.email && user.data !== 'Invaild Email or Password') {
        _handleLogin({ _id: user.data._id, username: user.data.username, email: user.data.email });
        return newUser;
    }
    else {
        return { msg: 'Wrong Password!', ok: false };
    }
}

async function logout() {
    await axios.post(`${BASE_URL}/logout`);
    sessionStorage.clear();
}

async function signup(userData) {
    const err = 'Email already exists!'
    const succss = 'You have successfully signed up! redirecting...'
    const users = await usersService.loadUsers();
    var exists = users.some(user => user.email === userData.email);
    if (exists) return { msg: err, ok: false };
    else if (!exists) {
        await axios.post(`${BASE_URL}/signup`, userData);
        return { msg: succss, ok: true };
    }
}


function _handleLogin(user) {
    sessionStorage.setItem('user', JSON.stringify(user));
    return user;
}
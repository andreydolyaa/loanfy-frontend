import axios from 'axios';

const BASE_URL = process.env.NODE_ENV === 'production'
    ? '/api/users'
    : 'http://localhost:3001/api/users'


export const usersService = {
    loadUsers,
    getUserById,
    addNewUser,
    updateUser,
    deleteUser,
    getUserByEmail,
    sendMsgToAllUsers
}


async function loadUsers() {
    var res = await axios.get(BASE_URL);
    return res.data;
}

async function getUserByEmail(email) {
    const users = await loadUsers();
    // console.log(users);
    const user = users.find(user => user.email === email);
    return user;
}

async function getUserById(userId) {
    var res = await axios.get(`${BASE_URL}/${userId}`);
    return res.data;
}

async function addNewUser(user) {
    var res = await axios.post(BASE_URL, user);
    return res.data;
}

async function updateUser(userId, user) {
    var res = await axios.put(`${BASE_URL}/${userId}`, user);
    return res.data;
}

async function deleteUser(userId) {
    var res = await axios.delete(`${BASE_URL}/${userId}`);
    return res.data;
}

async function sendMsgToAllUsers(msg) {
    var users = await axios.get(BASE_URL);

    users.data.forEach(async currUser => {
        var user = await getUserById(currUser._id);
        if(user.loanDetails){
            user.loanDetails.messages.push(msg);
            await updateUser(currUser._id, user);
        }
    })
}
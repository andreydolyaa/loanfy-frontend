

import axios from 'axios';

const BASE_URL = process.env.NODE_ENV === 'production'
    ? '/subscribe'
    : 'http://localhost:3001/subscribe'



export const emailService = {
    subscribeToNewsletter
}

async function subscribeToNewsletter(email) {
    var data = {email}
    return await axios.post(BASE_URL, data);
}
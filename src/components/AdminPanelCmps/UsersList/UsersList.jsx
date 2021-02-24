

import React, { useEffect, useState } from 'react';
import './UsersList.scss';

export default function UsersList({ users, getUserId }) {
    const [usersList, setUsersList] = useState([]);

    const filterUsersList = () => {
        var userList = users.filter(user => !user.isAdmin);
        setUsersList(userList);
    }

    useEffect(() => {
        filterUsersList();
    }, [users])

    const viewUser = (userId) => {
        getUserId(userId);
    }

    return (
        <div>
            <ul className="users-list">
                <h3>Borrowers List</h3>
                {usersList.map(user => {
                    return (
                        <div key={user._id} onClick={() => viewUser(user._id)}>
                            <li>
                                <p>{user.loanDetails.firstName} {user.loanDetails.lastName}</p>
                                <p>ID: {user._id}</p>
                            </li>
                        </div>
                    )
                })}
            </ul>
        </div>
    )
}



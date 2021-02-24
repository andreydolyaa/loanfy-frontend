
import React, { useEffect } from 'react';
import './UserContact.scss';

export default function UserContact({ user }) {

    useEffect(() => {
    }, [user])


    return (
        <div className="user-contact">
            <h3>{user.loanDetails.firstName} {user.loanDetails.lastName} contact deatils</h3>
            <p>Email: <span>{user.loanDetails.email}</span></p>
            <p>Address: <span>{user.loanDetails.address}</span></p>
            <p>Phone Number: <span>{user.loanDetails.phone}</span></p>
            <p>Bank Account Number: <span>{user.loanDetails.bankAccountNum}</span></p>
        </div>
    )
}

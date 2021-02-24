import React, { useEffect, useState } from 'react';
import './UserMail.scss';
import { ArrowLeftIcon, TrashIcon } from '@primer/octicons-react';
import { usersService } from './../../services/usersService';

export default function UserMail({ user }) {
    const [msg, setMsg] = useState();
    const [toggleMsg, setToggleMsg] = useState(false);
    const [msgDlt, setDlt] = useState(false);

    useEffect(() => {
    }, [user]);

    const showMsg = (msgId) => {
        const msg = user.loanDetails.messages.find(msg => msg._id === msgId);
        setMsg(msg);
        setToggleMsg(true);
    }

    const returnToMailList = () => {
        setToggleMsg(false);
        setMsg(null);
    }

    const deleteMsg = async (ev, msgId) => {
        ev.stopPropagation();
        const msgIdx = user.loanDetails.messages.findIndex(msg => msg._id === msgId);
        const updatedUser = JSON.parse(JSON.stringify(user));
        updatedUser.loanDetails.messages.splice(msgIdx, 1);
        await usersService.updateUser(user._id, updatedUser);
    }

    const { messages } = user.loanDetails
    return (
        <div className="user-mail">
        {!messages.length && <p>Your inbox is empty.</p>}
            {messages.map((msg, idx) => {
                return !toggleMsg && (
                    <div className="message flex" key={msg._id} onClick={() => showMsg(msg._id)}>
                        <p>{msg.title}</p>
                        <div className="trs flex">
                            <p>{msg.date}</p>
                            <div onClick={(ev) => deleteMsg(ev, msg._id)}>
                                <TrashIcon size={16} className="ics" />
                            </div>
                        </div>
                    </div>
                )
            })}
            {toggleMsg &&
                <div className="show-msg">
                    <h2>{msg.title}</h2>
                    <p className="msg-body">{msg.message}</p>
                    <p className="date">{msg.date}</p>
                    <div className="return" onClick={returnToMailList}>
                        <ArrowLeftIcon size={24} />
                    </div>
                </div>
            }
        </div>
    )
}

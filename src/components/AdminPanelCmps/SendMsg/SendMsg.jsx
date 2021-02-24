
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import './SendMsg.scss';
import { useDispatch } from 'react-redux';
import { usersService } from './../../../services/usersService';
import { utilService } from './../../../services/utilService';

export default function SendMsg() {
    const dispatch = useDispatch();
    const [msgSent, setMsgSent] = useState(false);
    const { register, handleSubmit, errors, reset } = useForm();


    const submitMessage = async (data) => {
        if (!data.title || !data.message) {
            console.log('Fill the form');
            return;
        }
        else {
            var time = new Date();
            var msg = {
                _id: utilService.createId(10),
                title: data.title,
                message: data.message,
                isRead: false,
                date: time.toUTCString()
            }
            await usersService.sendMsgToAllUsers(msg);
            msgIsSent();
            reset();
        }
    }

    const msgIsSent = () => {
        setMsgSent(true);
        var interval = setInterval(() => {
            setMsgSent(false);
            clearInterval(interval);
        }, 3000)
    }


    return (
        <div className="send-msg">
            <h3>Send global message to all borrowers</h3>
            <form onSubmit={handleSubmit(submitMessage)}>
                <div>
                    <p>Title:</p>
                    <input type="text" name="title" placeholder="Title" ref={register} />
                </div>
                <div>
                    <p>Message:</p>
                    <textarea name="message" cols="30" rows="10" ref={register}></textarea>
                    <button>SEND</button>
                </div>
            </form>
            {msgSent &&
                <div className="msg">
                    Message has been sent!
            </div>
            }
        </div>
    )
}

import React, { useRef, useState } from 'react';
import './Subscribe.scss';
import postSvg from '../../assets/img/post.svg';
import { emailService } from './../../services/mailService';

export default function Subscribe() {
    const [ok, setOk] = useState(false);
    const mailRef = useRef();

    const subscribeToNewsletter = async (event) => {
        event.preventDefault();
        await emailService.subscribeToNewsletter(mailRef.current.value);
        setOk(true);
        mailRef.current.value = '';
    }

    return (
        <div className="subscribe">

            <div className="inner">
                <div className="sub">

                    <h1>Signup for <span>loanfy</span> updates!</h1>
                    <p>Get all the latest updates about our programs and news, straight to your inbox.</p>
                    <form action="">
                        <input type="email" placeholder="Your Email" ref={mailRef} />
                        <button onClick={subscribeToNewsletter}>Signup</button>
                    </form>
                    <p className="terms">You can unsubscribe at any moment.</p>
                </div>

                <object type="image/svg+xml" data={postSvg} className="svg"></object>

            </div>
            {ok &&
                <div className="subd">
                    <p>You have subscribed to our newsletter!</p>
                </div>}
                <div class="custom-shape-divider-bottom-1614200297">
                <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                    <path d="M0,0V6c0,21.6,291,111.46,741,110.26,445.39,3.6,459-88.3,459-110.26V0Z" class="shape-fill"></path>
                </svg>
            </div>
        </div>
    )
}

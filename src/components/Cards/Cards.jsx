import React from 'react';
import './Cards.scss';
import chooseIcon from '../../assets/img/icons/choose.png';
import easyIcon from '../../assets/img/icons/easy.png';
import trackIcon from '../../assets/img/icons/track.png';
import { ArrowDownIcon } from '@primer/octicons-react';

export default function Cards() {
    return (
        <div className="cards">
            <h1>We provide you with the best solutions </h1>


            <div className="inner">
                <div className="container">
                    <div className="card">
                        <img src={chooseIcon} />
                        <h2>Choose your loan</h2>
                        <ArrowDownIcon size={24} className="icon" />
                        <p>You can select from a variety of our programs, and fit the best one for you.</p>
                    </div>
                    <ArrowDownIcon size={24} className="icon-outside" />
                    <div className="exp">
                        <p>Our teams constantly researches for the best interest optimization, to reduces payments and returns for our clients.</p>
                    </div>
                </div>
                <div className="container">
                    <div className="card">
                        <img src={easyIcon} />
                        <h2>Easy procedure</h2>
                        <ArrowDownIcon size={24} className="icon" />
                        <p>No complex procedures or unclear terms, just select your program and thats it.</p>
                    </div>
                    <ArrowDownIcon size={24} className="icon-outside" />
                    <div className="exp">
                        <p>We remove any complex terms and try our best to make our clients understand every piece of thier plan.</p>
                    </div>
                </div>
                <div className="container">
                    <div className="card">
                        <img src={trackIcon} />
                        <h2>Track your progress</h2>
                        <ArrowDownIcon size={24} className="icon" />
                        <p>You can track your loan details in your personal area, all what you need is there.</p>
                    </div>
                    <ArrowDownIcon size={24} className="icon-outside" />
                    <div className="exp">
                        <p>We created a personal area for every of our clients to track thier loans and return, its simple and has all the data needed.</p>
                    </div>
                </div>
            </div>



        </div>
    )
}

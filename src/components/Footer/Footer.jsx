

import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.scss';

export default function Footer() {
    return (
        <div className="footer">


            <div className="inner">
                <div className="column">
                    <h1>loanfy</h1>
                    <a href="https://github.com/andreydolyaa">Github</a>
                    <a href="https://www.linkedin.com/in/andrey-dolya-250130203/">Linkedin</a>
                </div>
                <div className="column">
                    <h3>Company</h3>
                    <Link to="/">About</Link>
                    <Link to="/">Team</Link>
                    <Link to="/">Products</Link>
                    <Link to="/">Career</Link>
                </div>
                <div className="column">
                    <h3>Programs</h3>
                    <Link to="/">Loans</Link>
                    <Link to="/">Partners</Link>
                    <Link to="/">Content</Link>
                    <Link to="/">Staff</Link>
                </div>
                <div className="column">
                    <h3>Support</h3>
                    <Link to="/">Developers</Link>
                    <Link to="/">Support</Link>
                    <Link to="/">Join</Link>
                    <Link to="/">Set</Link>
                </div>
                </div>
                <p>Created by Andrey Dolya 2021.</p>


        </div>
    )
}

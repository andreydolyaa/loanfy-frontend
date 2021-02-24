

import React from 'react';
import './StarsAnimation.scss';
import { Particles } from 'react-tsparticles';

export default function StarsAnimation(props) {
    return (
        <div className="particles">
            <Particles height={window.outerHeight}
                id="tsparticles"
                options={{
                    fpsLimit: 60,
                    interactivity: {
                        detectsOn: "window",
                        events: {
                            onClick: {
                                enable: false,
                                mode: "push",
                            },
                            onHover: {
                                enable: false,
                                mode: "bubble",
                            },
                            resize: true,
                        },
                        modes: {
                            connect:{
                                opacity:0.2
                            },
                            bubble: {
                                distance: 100,
                                duration: 3,
                                opacity: 0.8,
                                size: 4,
                            },
                            push: {
                                quantity: 22,
                            },
                            repulse: {
                                distance: 155,
                                duration: 0.4,
                            },
                        },
                    },
                    particles: {
                        color: {
                            value: "#ffffff",
                        },
                        twinkle:{
                            particles:{
                                enable:true,
                                color:'#00BDFF',
                                frequency:.1,
                                opacity:0.4
                            }
                        },
                        shadow:{
                            offset:{
                                x:-1,
                                y:1
                            },
                            enable:true,
                            blur:20,
                            color:'#00FFE0'
                        },
                        links: {
                            color: "#ffffff",
                            distance: 100,
                            enable: false,
                            opacity: .02,
                            width: 1,
                        },
                        collisions: {
                            enable: true,
                        },
                        move: {
                            direction: "top-right",
                            enable: true,
                            outMode: "out",
                            random: true,
                            speed: 3,
                            straight: false,
                            warp:true,
                        },
                        number: {
                            density: {
                                enable: true,
                                value_area: 800,
                            },
                            value: 250,
                        },
                        opacity: {
                            value: .2,
                        },
                        shape: {
                            type: "circle",
                        },
                        size: {
                            random: true,
                            value: 2,
                        },
                    },
                    detectRetina: true,
                }}
            />
        </div>
    )
}

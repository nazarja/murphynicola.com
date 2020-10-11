import React, { useEffect, useRef } from 'react';
import { useSpring, animated } from 'react-spring';
import { animate } from './Animate';
import { connect } from 'react-redux';
import { mount } from '../Other/utils/utils';
import Loader from '../Other/Loader';
import './Landing.css';

const Landing = ({ data }) => {
    const [props, set] = useSpring(() => ({ xy: [0, 0], config: { mass: 10, tension: 550, friction: 140 } }));
    const calc = (x, y) => [x - window.innerWidth / 2, y - window.innerHeight / 2];
    const trans = (x, y) => `translate3d(${x / 10}px,${y / 10}px,0)`;

    const imagesRef = useRef(null);
    const textRef = useRef(null);
    const barsRef = useRef(null);

    useEffect(() => {
        mount('mount', 'Nicola Murphy');
        if (data) animate(imagesRef, textRef, barsRef);
        return () => mount('unmount', null);
    }, [data]);

    return data
        ? (
            <div id="landing" onMouseMove={({ clientX: x, clientY: y }) => set({ xy: calc(x, y) })}>
                <div ref={imagesRef} className="images">
                    {
                        data.data.map((item, index) => (
                            <div key={'landingSlide' + index} className="image-container uk-position-center">
                                <img className="image-slide" src={item.imageURL} alt={item.imageALT} />
                            </div>
                        ))
                    }
                </div>
                <animated.div
                    className="spring-move"
                    style={{ transform: props.xy.interpolate(trans) }}
                >
                    <div ref={textRef} className="text uk-position-center">
                        {
                            data.data.map((item, index) => (
                                <div key={'textSlide' + index} className="text-container">
                                    <p className="text-slide">{item.text}</p>
                                </div>
                            ))
                        }
                    </div>
                </animated.div>
                <div ref={barsRef} className="bars uk-position-center">
                    <div className="bar"></div>
                    <div className="bar"></div>
                    <div className="bar"></div>
                    <div className="bar"></div>
                </div>
            </div>
        )
        : <Loader />
};

const mapStateToProps = state => {
    return {
        data: state.data.landing
    };
};

export default connect(mapStateToProps, null)(Landing);
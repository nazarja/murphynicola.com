import React, { useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { TweenMax, TimelineLite, Power4 } from 'gsap/all';
import { mount } from '../Other/utils/utils';
import SplitTextJS from 'split-text-js';
import Loader from '../Other/Loader';
import './About.css';

const About = ({ data }) => {
    const titleRef = useRef(null);
    const bodyRef = useRef(null);
    const arrowRef = useRef(null);
    const profileRef = useRef(null);
    const figureRef = useRef(null);

    useEffect(() => {
        mount(null, 'About - Nicola Murphy');
        if (data) setTimeout(() => animate(), 1000);
    });

    const random = (min, max) => (Math.random() * (max - min)) + min;

    const animate = () => {
        TweenMax.fromTo(bodyRef.current, .2, { opacity: 0 }, { opacity: 1 });
        TweenMax.fromTo(titleRef.current, .5, { opacity: 0 }, { opacity: 1, delay: 2.5 });
        TweenMax.fromTo(arrowRef.current, .5, { opacity: 0 }, { opacity: 1, delay: 3 });

        const text = new SplitTextJS(bodyRef.current);
        text.chars.forEach((char, i) => {
            TweenMax.from(char, 1.8, {
                opacity: 0,
                x: random(-500, 500),
                y: random(500, 0),
                z: random(-500, 500),
                scale: .1,
                delay: .02,
            });
        });
    };

    const showProfile = () => {
        const captions = [...figureRef.current.querySelectorAll('figcaption')];
        const caption0 = new SplitTextJS(captions[0]);
        const caption1 = new SplitTextJS(captions[1]);

        const tl = new TimelineLite({ repeat: 0 });
        tl.to(profileRef.current, { display: 'block', duration: 0 });
        tl.to(profileRef.current, { opacity: 1, duration: .5 });
        tl.fromTo(figureRef.current, { y: -100, opacity: 0 }, { y: 0, opacity: 1, duration: .4 });
        tl.staggerFrom(caption0.chars, 0.5, { y: 40, opacity: 0, ease: Power4.easeOut }, 0.01);
        tl.staggerFrom(caption1.chars, 0.5, { y: 40, opacity: 0, ease: Power4.easeOut }, 0.01);
    };

    const closeProfile = () => {
        const tl = new TimelineLite({ repeat: 0 });
        tl.to(profileRef.current, { opacity: 0, duration: .5 });
        tl.to(profileRef.current, { display: 'none', duration: 0 });
    };

    return data
        ? (
            <>
                <div id="about">
                    <div className="text uk-position-center">
                        <h1 ref={titleRef}>Hi there, I'm Nicola.</h1>
                        <p ref={bodyRef}>{data.text}</p>
                        <div ref={arrowRef} className="arrow" onClick={showProfile} data-hover>
                            <span className="arrow-text" data-hover>see me</span>
                            <span className="arrow-icon" uk-icon="icon: chevron-down"/>
                        </div>
                    </div>
                    <div ref={profileRef} id="profile" onClick={closeProfile}>
                        <figure ref={figureRef} className="profile-figure uk-position-center">
                            <img src={data.imageURL} alt="Nicola Murphy, Graphic Designer" />
                            <figcaption>Nicola Murphy</figcaption>
                            <figcaption>Graphic Designer</figcaption>
                        </figure>
                    </div>
                </div>
                <div className="reveal-block" />
            </>
        )
        : <Loader />;
};

const mapStateToProps = state => {
    return {
        data: state.data.about
    };
};

export default connect(mapStateToProps, null)(About);
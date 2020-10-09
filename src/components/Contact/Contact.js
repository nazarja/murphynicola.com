import React, { useEffect, useRef } from 'react';
import { TimelineLite, TweenMax, Expo } from 'gsap/all';
import { useTrail, animated } from 'react-spring';
import { mount } from '../Other/utils/utils';
import './Contact.css';

export default () => {
    const titleRef = useRef(null);
    const detailsRef = useRef(null);
    const socialRef = useRef(null);

    const trail = useTrail(5, {
        config: { mass: 5, tension: 2500, friction: 250 },
        from: { width: 2560 },
        to: { width: 0 },
    });

    useEffect(() => {
        mount(null, 'Contact - Nicola Murphy');
        setTimeout(() => animate(), 1000);
    }, []);

    const animate = () => {
        const title = [...titleRef.current.querySelectorAll('h1 span')]

        if (title) {
            const tl = new TimelineLite({ repeat: 0 });
            tl.to(title[0], { opacity: 1, duration: .4 });
            tl.to(title[1], { opacity: 1, duration: .4 });
            tl.to(title[2], { opacity: 1, duration: .3 });
            tl.fromTo(titleRef.current, .6, { y: 150 }, { y: 0, delay: 1 });
            tl.fromTo(detailsRef.current, .5, { opacity: 0, y: 50 }, { opacity: 1, y: 0, delay: .3 });
            tl.fromTo(socialRef.current, .5, { opacity: 0, y: 50 }, { opacity: 1, y: 0, delay: -.3 });
        };
    };

    const animateLetters = event => {
        const letters = [...event.currentTarget.querySelectorAll('span')];
        TweenMax.killTweensOf(letters);
        TweenMax.set(letters, { opacity: 0 });
        TweenMax.staggerTo(letters, 0.8, {
            ease: Expo.easeOut,
            startAt: { y: '50%' },
            y: '0%',
            opacity: 1
        }, 0.03);
    }

    const renderSocialLinks = () => {
        const arr = [
            ['Instagram', 'https://www.instagram.com/nicolamurphy321'],
            ['Facebook', 'https://www.facebook.com/nicola.murphy.9231'],
            ['LinkedIn', 'https://www.linkedin.com/in/nicola-murphy-b81249a9/']
        ];

        return arr.map((link, i) => {
            return (
                <React.Fragment key={link[0] + i}>
                    <li>
                        <a
                            href={link[1]}
                            target="_blank"
                            rel="noopener noreferrer"
                            onMouseEnter={animateLetters}
                        >
                            {renderSocialSpans(link[0])}
                        </a>
                    </li>
                    {
                        i !== link.length
                            ? <li className="seperator" />
                            : null
                    }
                </React.Fragment>
            );
        });
    };

    const renderSocialSpans = text => text.split('').map((char, index) => <span key={text + index} data-hover>{char}</span>)

    return (
        <div id="contact">
            <div className="uk-position-center">
                <h1 ref={titleRef}>
                    <span>Say </span>
                    <span>Hey</span>
                    <span>.</span>
                    {/* {'Say Hey .'.split(' ').map(item => <span>{item}</span>)} */}
                </h1>
                <div id="details" ref={detailsRef}>
                    <a
                        href="mailto:nicolamurphy321@gmail.com"
                        rel="noopener noreferrer"
                    > nicolamurphy321<span className="at" data-hover>(at)</span>gmail.com
                    </a>
                    <a
                        href="phone:+4917673237693"
                        rel="noopener noreferrer"
                    > Tel: +49 176 73237693
                    </a>
                </div>
                <ul id="social" ref={socialRef}> {renderSocialLinks()} </ul>
            </div>
            <div id="reveal">
                {
                    trail.map(({ width, ...rest }, index) => {
                        return (
                            <animated.div
                                key={index + 'reveal-spring'}
                                className="trails-reveal"
                                style={{ width }}
                            ></animated.div>
                        )
                    })
                }
            </div>
        </div>
    );
};
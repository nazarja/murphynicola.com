import React, { useState, useEffect, useRef } from 'react';
import { gsap, Power3 } from 'gsap/all';
import { Link } from 'react-router-dom';

export default ({ color }) => {
    const [navState, setNavState] = useState(false);
    const sidebarRef = useRef(null);
    const sidebarNavRef = useRef(null);
    const navLayerRef = useRef(null);
    const navLinksRef = useRef(null);
    const navTimelineRef = useRef();

    useEffect(() => {
        const navLinks = [...navLinksRef.current.querySelectorAll('a')]
        navTimelineRef.current = gsap.timeline({ paused: true });
        navTimelineRef.current.fromTo(
            [sidebarRef.current, navLayerRef.current, sidebarNavRef.current],
            { duration: 0, x: '100%' },
            { duration: 0.75, x: '0%', ease: Power3.easeInOut, stagger: { amount: 0.5 } },
        )
        navTimelineRef.current.fromTo(
            [navLinks[0], navLinks[1], navLinks[2], navLinks[3]],
            { x: '-100%' },
            { x: '0%', stagger: { amount: 0.4 }, ease: Power3.easeInOut, duration: .5 }, '-=.5')
    }, []);

    useEffect(() => {
        navState ? navTimelineRef.current.play() : navTimelineRef.current.reverse();
    }, [navState]);

    const forceCloseNav = () => navTimelineRef.current.seek(0).pause();

    const isActiveAndColor = () => {
        return navState && color === 'dark'
            ? 'active dark'
            : navState && color === 'light'
                ? 'active light'
                : '';
    };

    const renderLinks = () => {
        return [
            ['/', 'Home'], ['/work', 'Work'],
            ['/contact', 'Contact'], ['/about', 'About']
        ].map((item, index) => (
            <Link
                key={'links' + index}
                to={item[0]}
                className="nav-link"
                onClick={() => forceCloseNav()}
            >
                {item[1]}
                <span className="underline"></span>
            </Link>
        ));
    };

    const renderSocialLinks = () => {
        return [
            ['instagram', 'https://www.instagram.com/nicolamurphy321'],
            ['facebook', 'https://www.facebook.com/nicola.murphy.9231'],
            ['linkedin', 'https://www.linkedin.com/in/nicola-murphy-b81249a9/']
        ].map((item, index) => (
            <a
                key={'sociallinks' + index}
                className="social-link"
                href={item[1]}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => forceCloseNav()}
            >
                <i className={`fab fa-${item[0]}`}></i>
            </a>
        ));
    };

    return (
        <div id="mobile">
            <div className="topbar">
                <Link to="/" className={`${color} logo`}>Nicola Murphy</Link>
                <div
                    className={`menu-trigger ${navState ? 'nav-close' : ''} ${isActiveAndColor()}`}
                    onClick={() => setNavState(!navState)}
                >
                    <div className={`menu-bars ${color}`}>
                        <div className="bar1"></div>
                        <div className="bar2"></div>
                    </div>
                </div>
            </div>
            <div id="sidebar" ref={sidebarRef} onClick={() => setNavState(!navState)}>
                <div className="nav-wrapper">
                    <div ref={navLayerRef} className="nav-layer"></div>
                    <nav ref={sidebarNavRef} className="sidebarNav">
                        <div className="sidebar-top">
                            <div className="tagline">
                                Nicola Murphy
                            </div>
                            <div ref={navLinksRef} className="links-wrapper">
                                {renderLinks()}
                            </div>
                        </div>
                        <div className="sidebar-bottom">
                            <ul className="extra-links">
                                <li className="link-item">
                                    <div className="link-title">Social Media</div>
                                    <div className="social-media-links">
                                        {renderSocialLinks()}
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </nav>
                </div>
            </div>
        </div>
    );
};


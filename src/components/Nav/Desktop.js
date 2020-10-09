import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

export default ({ color, path }) => {
    const links = [
        { 'url': '/', 'className': 'home', 'text': 'Nicola Murphy' },
        { 'url': '/work', 'className': 'work', 'text': 'Work' },
        { 'url': '/contact', 'className': 'contact', 'text': 'Contact' },
        { 'url': '/about', 'className': 'about', 'text': 'About' }
    ];

    useEffect(() => {
        return () => setLinksOpacity(null, null);
    }, [path]);

    const renderLinks = () => {
        return links.map(({ url, className, text }) => {
            return (
                <li
                    className={`${className}`}
                    key={url}
                    data-hover
                >
                    <Link
                        to={`${url}`}
                        className={`${path === url ? 'active' : ''}`}
                        onMouseEnter={() => setLinksOpacity(className, 'enter')}
                        onMouseLeave={() => setLinksOpacity(className, 'leave')}
                    >
                        <span data-hover={text}>{text}</span>
                    </Link>
                </li>
            );
        });
    };

    const setLinksOpacity = (currentLink, event) => {
        const links = document.querySelectorAll('#nav li a');
        if (event === 'enter') {
            links.forEach(link => {
                links.forEach(link => {
                    if (!link.parentElement.classList.contains(currentLink)) link.style.opacity = '0';
                });
            });
        }
        else links.forEach(link => { link.style.opacity = '1' });
    };

    return (
        <ul id="desktop" className={`${color}`}>
            <nav className="cl-effect">
                {renderLinks()}
            </nav>
        </ul>
    );
};